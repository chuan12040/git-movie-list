const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'

const dataPanel = document.querySelector('#data-panel')
// const searchForm = document.querySelector('#search-form')
// const searchInput = document.querySelector('#search-input')

// axios.get(INDEX_URL).then((response) => {
//   movies.push(...response.data.results)
//   console.log(movies)
//   renderMovieList(movies)
// }).catch((err) => console.log(err))

// function addToFavorite(id) {
//   const list = JSON.parse(localStorage.getItem('favoriteMovies')) || []
//   const movie = movies.find((movie) => movie.id === id)
//   if (list.some((movie) => movie.id === id)) {
//     return alert('此電影已經在收藏清單中！')
//   }
//   list.push(movie)
//   localStorage.setItem('favoriteMovies', JSON.stringify(list))
// }
const movies = JSON.parse(localStorage.getItem('favoriteMovies'))
renderMovieList(movies)

// 監聽 data panel
dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.btn-show-movie')) {
    showMovieModal(event.target.dataset.id)
  } else if (event.target.matches('.btn-remove-favorite')) {
    removeFromFavorite(Number(event.target.dataset.id))
  }
})

function removeFromFavorite(id) {
  if (!movies) return
  //透過 id 找到要刪除電影的 index
  const movieIndex = movies.findIndex((movie) => movie.id === id)
  if (movieIndex === -1) return
  //刪除該筆電影
  movies.splice(movieIndex, 1)
  //存回 local storage
  localStorage.setItem('favoriteMovies', JSON.stringify(movies))
  //更新頁面
  renderMovieList(movies)
}
// searchForm.addEventListener('submit', function onSearchFormSubmitted(event) {
//   event.preventDefault()
//   const keyword = searchInput.value.trim().toLowerCase()
//   let filteredMovies = []
//   // if (!keyword.length) {
//   //   return alert('請輸入有效字串!')
//   // } 


//   filteredMovies = movies.filter((movie) =>
//     movie.title.toLowerCase().includes(keyword)
//   )
//   if (filteredMovies.length === 0) {
//     console.log(`您輸入的關鍵字：${keyword} 沒有符合條件的電影`)
//     return alert(`您輸入的關鍵字：${keyword} 沒有符合條件的電影`)
//   }
//   renderMovieList(filteredMovies)
// })

function renderMovieList(data) {
  let rawHTML = ''
  data.forEach((item) => {
    // title, image
    rawHTML += `<div class="col-sm-3">
    <div class="mb-2">
      <div class="card">
        <img src="${POSTER_URL + item.image
      }" class="card-img-top" alt="Movie Poster">
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#movie-modal" data-id="${item.id}">More</button>
          <button class="btn btn-danger btn-remove-favorite" data-id="${item.id}">X</button>
        </div>
      </div>
    </div>
  </div>`
  })
  dataPanel.innerHTML = rawHTML
}

function showMovieModal(id) {
  const modalTitle = document.querySelector('#movie-modal-title')
  const modalImage = document.querySelector('#movie-modal-image')
  const modalDate = document.querySelector('#movie-modal-date')
  const modalDescription = document.querySelector('#movie-modal-description')
  axios.get(INDEX_URL + id).then((response) => {
    const data = response.data.results
    modalTitle.innerText = data.title
    modalDate.innerText = 'Release date: ' + data.release_date
    modalDescription.innerText = data.description
    modalImage.innerHTML = `<img src="${POSTER_URL + data.image
      }" alt="movie-poster" class="img-fluid">`
  })
}



