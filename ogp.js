document.querySelectorAll(".article-card[data-ogp-url]").forEach((card) => {
  const url = card.dataset.ogpUrl;

  fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`)
    .then((res) => res.json())
    .then((res) => {
      if (res.status !== "success") return;

      const { title, image, logo } = res.data;
      const titleEl = card.querySelector(".article-card-title");
      const imageEl = card.querySelector(".article-card-image");

      if (title) titleEl.textContent = title;

      const imageUrl = (image && image.url) || (logo && logo.url);
      if (imageUrl) imageEl.style.backgroundImage = `url("${imageUrl}")`;
    })
    .catch(() => {
      card.querySelector(".article-card-title").textContent = card.href;
    });
});
