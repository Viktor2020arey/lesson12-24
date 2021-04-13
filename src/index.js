import articlesTpl from './templates/articles.hbs';
import './styles.css';
import NewsApiService from './news-service.js';

// 5be165b6653240ec96b78cb03ebe4321

// apiKey=5be165b6653240ec96b78cb03ebe4321

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  articlesContainer: document.querySelector('.js-articles-container'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  clearArticlesContainer();
  newsApiService.query = e.currentTarget.elements.query.value;

  if (newsApiService.query === '') {
    return alert('Введи что-то нормальное');
  }

  newsApiService.resetPage();
  newsApiService.fetchArticles(searchQuery).then(appendArticlesMarkup);
}

function onLoadMore() {
  newsApiService.fetchArticles(searchQuery).then(appendArticlesMarkup);
}

function appendArticlesMarkup(articles) {
  refs.articlesContainer.insertAdjacentHTML('beforeend', articlesTpl(articles));
}

function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}
