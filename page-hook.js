(() => {
  const BRIDGE_SOURCE = "anti-ai-page-hook";
  const MAX_ITEMS = 48;
  const MAX_TEXT_LENGTH = 1800;

  function normalizeText(value) {
    return String(value || "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function extractText(value, collector, depth = 0) {
    if (!value || depth > 6) return;

    if (typeof value === "string") {
      const text = normalizeText(value);
      if (text) collector.push(text);
      return;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        extractText(item, collector, depth + 1);
      }
      return;
    }

    if (typeof value === "object") {
      for (const [key, nested] of Object.entries(value)) {
        if (key === "videoId") continue;
        extractText(nested, collector, depth + 1);
      }
    }
  }

  function collectVideoMetadata(root) {
    const items = [];
    const seen = new Set();

    function visit(value, depth = 0) {
      if (!value || depth > 8 || items.length >= MAX_ITEMS) return;

      if (Array.isArray(value)) {
        for (const item of value) {
          visit(item, depth + 1);
        }
        return;
      }

      if (typeof value !== "object") return;

      const videoId =
        typeof value.videoId === "string" && value.videoId.trim() ? value.videoId.trim() : "";
      if (videoId && !seen.has(videoId)) {
        const collector = [];
        extractText(value, collector, 0);
        const text = normalizeText(collector.join(" ")).slice(0, MAX_TEXT_LENGTH);
        if (text) {
          items.push({ videoId, text });
          seen.add(videoId);
        }
      }

      for (const nested of Object.values(value)) {
        visit(nested, depth + 1);
      }
    }

    visit(root, 0);
    return items;
  }

  function emitMetadata(payload) {
    const items = collectVideoMetadata(payload);
    if (!items.length) return;

    window.postMessage(
      {
        source: BRIDGE_SOURCE,
        kind: "youtube-metadata",
        items
      },
      "*"
    );
  }

  async function inspectResponse(url, response) {
    if (!/youtubei\/v1|browse|next|reel|shorts/i.test(String(url || ""))) return;
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) return;

    try {
      const payload = await response.clone().json();
      emitMetadata(payload);
    } catch {
      // Ignore parse failures from non-JSON or streamed responses.
    }
  }

  const originalFetch = window.fetch;
  window.fetch = async function (...args) {
    const response = await originalFetch.apply(this, args);
    const requestUrl =
      typeof args[0] === "string" ? args[0] : args[0]?.url || response?.url || "";
    inspectResponse(requestUrl, response);
    return response;
  };

  const originalOpen = XMLHttpRequest.prototype.open;
  const originalSend = XMLHttpRequest.prototype.send;

  XMLHttpRequest.prototype.open = function (method, url, ...rest) {
    this.__antiAiUrl = url;
    return originalOpen.call(this, method, url, ...rest);
  };

  XMLHttpRequest.prototype.send = function (...args) {
    this.addEventListener("load", () => {
      const url = this.__antiAiUrl || this.responseURL || "";
      const contentType = this.getResponseHeader("content-type") || "";
      if (!/youtubei\/v1|browse|next|reel|shorts/i.test(String(url || ""))) return;
      if (!contentType.includes("application/json")) return;
      if (typeof this.responseText !== "string" || !this.responseText) return;

      try {
        emitMetadata(JSON.parse(this.responseText));
      } catch {
        // Ignore invalid JSON payloads.
      }
    });

    return originalSend.apply(this, args);
  };
})();
