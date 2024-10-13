// ==UserScript==
// @name         AniWorld OnePice Filler highlighter
// @description  Highlights Filler episodes on aniworld for OnePiece in red
// @namespace    https://github.com/Johannes7k75
// @version      1.0.1
// @match        https://aniworld.to/anime/stream/one-piece/*
// @updateURL    https://raw.githubusercontent.com/Johannes7k75/tapermonkey-user-scripts/refs/heads/main/OnePiece-Filler/OnePieceFiller.js
// @downloadURL  https://raw.githubusercontent.com/Johannes7k75/tapermonkey-user-scripts/refs/heads/main/OnePiece-Filler/OnePieceFiller.js
// @require      https://github.com/Johannes7k75/tapermonkey-user-scripts/releases/download/OnePieceFiller/one-piece.js
// ==/UserScript==

(function () {
  "use strict";

  const [seasons, episodes] = document.querySelectorAll("#stream ul")
const activeSeason = seasons.querySelector("li .active")

const style = document.createElement("style")
document.head.appendChild(style)

style.innerHTML = `
.filler a {
    background-color: rgb(161, 74, 64) !important;
    transition: unset !important;
}

.filler:hover {
    color: rgb(161, 74, 64) !important;
    font-weight: bold;
}
`

for (const ep of episodes.children) {
    const activeSeasonNum = Number.parseInt(activeSeason?.innerText)
    const episodeNumber = Number.parseInt(ep.querySelector("a")?.innerText)

    const isSameEpisode = (episode) => episode === episodeNumber
    const isSameSeason = (season) => season === activeSeasonNum

    const episodeData = onePieceJson.find((e)=>isSameEpisode(e.episode) && isSameSeason(e.season))

    if (!episodeData) continue;
    if (episodeData.isFiller) {
        ep.classList.add("filler")
    }
}
  
})();
