export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let pathname = decodeURIComponent(url.pathname);

    if (pathname === "/" || pathname === "") {
      pathname = "/index.html";
    }

    const assetUrl = new URL(pathname, request.url);
    const assetResponse = await env.ASSETS.fetch(new Request(assetUrl, request));

    if (assetResponse.status !== 404 || pathname.includes(".")) {
      return assetResponse;
    }

    return env.ASSETS.fetch(new Request(new URL("/index.html", request.url), request));
  }
};
