import * as cheerio from "cheerio";

const link = "https://www.animefillerlist.com/shows/one-piece";

const episodesPerSeason = [
    61,
    16, 
    14,
    39,
    13,
    52,
    33,
    35,
    73,
    45,
    26,
    14,
    101,
    58,
    62,
    50,
    56,
    55,
    74,
    14,
    197,
    33
]

const seasons: number[][] = [];
for (const i of episodesPerSeason) {
    const startOffset = seasons.at(-1)?.at(-1) ?? 0;
    const episodes = Array.from({length: i}, (_, i) => startOffset + i + 1);
    seasons.push(episodes);
}

const mappedSeasons = new Map<string, {season: number, episode: number}>();
seasons.forEach((season, index) => {
    for (const episode of season) {
        mappedSeasons.set(episode.toString(), {season: index + 1, episode: season.indexOf(episode) + 1});
    }
});

const request = await fetch(link);
const $ = cheerio.load(await request.text());

const onePieceJson: {id: number, title: string, date: string, isFiller: boolean, episode: number, season: number}[] = [];

$(".EpisodeList").each((i, el) => {
	$(el).find("tbody").children("tr").each((i, el)=>{
        const id = $(el).children("td.Number").text();
        const type = $(el).children("td.Type").text();
        const date = $(el).children("td.Date").text();
        const title = $(el).children("td.Title").text();

        if (mappedSeasons.has(id) === false) {
            console.log(id);
            return;
        }
        const {episode, season} = mappedSeasons.get(id) as {episode: number, season: number};

        const isFiller = type === "Filler";
        onePieceJson.push({
            id: Number.parseInt(id),
            title,
            date,
            isFiller,
            episode,
            season
        })
    });
});

Bun.write("one-piece.json", JSON.stringify(onePieceJson));
