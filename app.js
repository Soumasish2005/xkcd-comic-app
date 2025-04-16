
const comic = {
    current: null,
    latest: null
};

const loadingEl = document.getElementById('loading');
const titleEl = document.getElementById('title');
const numberEl = document.getElementById('number');
const imgEl = document.getElementById('comic-image');
const altTextEl = document.getElementById('alt-text');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const randomBtn = document.getElementById('randomBtn');

prevBtn.addEventListener('click', showPreviousComic);
nextBtn.addEventListener('click', showNextComic);
randomBtn.addEventListener('click', showRandomComic);

function setLoading(isLoading) {
    loadingEl.style.display = isLoading ? 'block' : 'none';
}

async function fetchComic(number) {
    try {
        setLoading(true);
        const response = await fetch(`https://xkcd.vercel.app/?comic=${number}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching comic:', error);
        return null;
    } finally {
        setLoading(false);
    }
}

function displayComic(data) {
    if (!data) return;
    
    comic.current = data;
    titleEl.textContent = data.title;
    numberEl.textContent = data.num;
    imgEl.src = data.img;
    imgEl.alt = data.alt;
    altTextEl.textContent = data.alt;

    prevBtn.disabled = data.num <= 1;
    nextBtn.disabled = data.num >= 600;
}

async function showPreviousComic() {
    if (comic.current && comic.current.num > 1) {
        const data = await fetchComic(comic.current.num - 1);
        displayComic(data);
    }
}

async function showNextComic() {
    if (comic.current && comic.current.num > 1) {
        const data = await fetchComic(comic.current.num + 1);
        displayComic(data);
    }
}

async function showRandomComic() {
    const randomNum = Math.floor(Math.random()*600) + 1;
    const data = await fetchComic(randomNum);
    displayComic(data);
}

async function init() {
  
    comic.latest = await fetchComic(Math.floor(Math.random()*10) + 1);
    if (!comic.latest) return;
    
    displayComic(comic.latest);
}

init();
