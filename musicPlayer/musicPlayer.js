var app = {
    
  currentIndex : 0, 
  songs:[
      {
          name: 'Versace',
          singer: 'The Same Persons',
          image: './asset/img/img4.jpg',
          path: './asset/music/Versace_The_Same_Persons.mp3'
      },
      {
          name: 'Nevada',
          singer: 'Vicetone',
          image: './asset/img/img5.jpg',
          path: './asset/music/Nevada_Vicetone_feat_Cozi_Zuehlsdorff.mp3'
      },
      {
          name: 'Love the way you like',
          singer: 'Skylar Grey',
          image: './asset/img/img6.jpg',
          path: './asset/music/Love_the_way_you_like_Skylar_Grey.mp3'
      },
      {
          name: 'Cheap Thrills',
          singer: 'Sia',
          image: './asset/img/img0.jpg',
          path: './asset/music/Cheap_Thrills_Sia.mp3'
      },
      {
          name: 'Love me like you do',
          singer: 'Ellie Goulding',
          image: './asset/img/img1.jpg',
          path:  './asset/music/Love_me_like_you_do_Ellie_Goulding.mp3'
      },
      {
          name: 'Love story',
          singer: 'Taylor Swift',
          image: './asset/img/img2.jpg',
          path: './asset/music/Love_story_Taylor_Swift.mp3'
      },
  ],
  
  render: function() {
      var htmls = this.songs.map(function(song, index) {
          return `
          <div class="song ${index == app.currentIndex ? 'active' : ''}" data-index="${index}">
              <div class="thumb" style="background-image: url('${song.image}')">
              </div>
              <div class="body">
                  <h3 class="title">${song.name}</h3>
                  <p class="author">${song.singer}</p>
              </div>
              <div class="option">
                  <i class="fas fa-ellipsis-h"></i>
              </div>
          </div>`
      })

      document.querySelector('.playlist').innerHTML = htmls.join('')
  },



  handleEvents: function() {
      var cd = document.querySelector('.cd')
      var cdWidth = cd.offsetWidth;
      

      //Xu ly khi scroll
      document.onscroll = function () {
      var scrollTop = window.scrollY 
      var newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth + "px" 
      //console.log(newCdWidth + "px")
      cd.style.opacity = newCdWidth / cdWidth;
      };

      //Xu ly play/pause 
      var playBtn = document.querySelector('.btn-toggle-play')
      var player = document.querySelector('.player')
      var audio = document.querySelector('#audio')
      playBtn.onclick = function() {
          if(player.classList == ('player playing')){
              player.classList.remove('playing')
              audio.pause()
              cdThumbAnimate.pause()
          }
          else{
            function getCurrentSongPath() {
              return app.songs[app.currentIndex].path
            }
              player.classList.add('playing')
              audio.src = getCurrentSongPath()
              audio.play()
              //console.log(audio.src)
              cdThumbAnimate.play()
          }

      }
      
      // Xu ly cd quay/dung
      var cdThumb = document.querySelector('.cd-thumb')
      var cdThumbAnimate = cdThumb.animate([
          {transform : 'rotate(360deg)'}
      ],{
          duration: 8000,
          iterations: Infinity
      })
      cdThumbAnimate.pause()
  },
  


  getCurrentSong: function() {
      return this.songs[this.currentIndex]
  },

  // Hi???n th??? danh s??ch b??i h??t ??? playlist
  loadCurrentSong() {
      var heading = document.querySelector('h2')
      var cdThumb = document.querySelector('.cd-thumb')
      var audio = document.querySelector('#audio')
      
      heading.innerText = this.getCurrentSong().name
      cdThumb.style.backgroundImage = `url('${this.getCurrentSong().image}')` 
      audio = this.getCurrentSong().path
  },

  // X??? l?? next b??i h??t
  nextSong: function() {
      var player = document.querySelector('.player')
      var nextBtn = document.querySelector('.btn-next')
      var randomBtn = document.querySelector('.btn-random')
      var focusSongInList = document.querySelectorAll('.song')
      nextBtn.onclick = function() {
        if(randomBtn.classList == ('btn btn-random active')){
          app.playSongRandom()
        }
        else {
          app.currentIndex++
          if(app.currentIndex >= app.songs.length) {
              app.currentIndex = 0
          }
          app.loadCurrentSong()
        }
        

        // X??? l?? hi???n th??? b??i h??t ??ang ph??t
        focusSongInList.forEach(function(song) {
          if(song.classList == 'song active') {
            song.classList.remove('active')
          }
        })
        focusSongInList[app.currentIndex].classList.add('active')
      }


  },

  // X??? l?? quay l???i b??i tr?????c
  preSong: function() {
      var preBtn = document.querySelector('.btn-prev')
      var randomBtn = document.querySelector('.btn-random')
      var focusSongInList = document.querySelectorAll('.song')
      preBtn.onclick = function() {
        if(randomBtn.classList == ('btn btn-random active')){
          app.playSongRandom()
        }
        else {
          app.currentIndex--
          console.log(app.currentIndex, app.songs.length)
          if(app.currentIndex < 0) {
              app.currentIndex = app.songs.length -1
          }
          
          app.loadCurrentSong()
        }

        // X??? l?? hi???n th??? b??i h??t ??ang ph??t
          focusSongInList.forEach(function(song) {
            if(song.classList == 'song active') {
              song.classList.remove('active')
            }
          })
          focusSongInList[app.currentIndex].classList.add('active')
      
      }
  },

  // X??? l?? ph??t ng???u nhi??n b??i h??t
  playSongRandom: function() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length)
    } while (newIndex === app.currentIndex) 
    app.currentIndex = newIndex;
    this.loadCurrentSong()
  },
  
  // Hi???n th??? ???? b???t/t???t n??t random
  randomSongRender: function() {
    var randomBtn = document.querySelector('.btn-random')
    randomBtn.onclick = function() {
      if(randomBtn.classList == ('btn btn-random active')) {
        randomBtn.classList.remove('active')
      }
      else {
        randomBtn.classList.add('active')
      }
    }

  },

  // Hi???n th??? ???? b???t/t???t n??t repeat
  repeatSongRender: function() {
    var repeatBtn = document.querySelector('.btn-repeat')
    repeatBtn.onclick = function() {
      if(repeatBtn.classList == ('btn btn-repeat active')) {
        repeatBtn.classList.remove('active')
      }
      else {
        repeatBtn.classList.add('active')
      }
    }
  },

  clickPlayList: function() {
    var player = document.querySelector('.player')
    const playlist = document.querySelector(".playlist");
      playlist.onclick = function (e) {
        const songNode = e.target.closest(".song:not(.active)");

        if (songNode || e.target.closest(".option")) {
          // X??? l?? khi click v??o song
          // Handle when clicking on the song
          if (songNode) {
            app.currentIndex = Number(songNode.dataset.index);
            app.loadCurrentSong();
            app.render();
            function getCurrentSongPath() {
              return app.songs[app.currentIndex].path
            }
              player.classList.add('playing')
              audio.src = getCurrentSongPath()
              audio.play()
          }

          // X??? l?? khi click v??o song option
          // Handle when clicking on the song option
          if (e.target.closest(".option")) {
          }
        }
      }
  },

  
  start: function() {
      
      //Hi???n th??? playlist
      this.render()
      this.loadCurrentSong(),

      //L???ng nghe x??? l?? s??? ki???n
      this.handleEvents() 
      this.nextSong()
      this.preSong()
      this.randomSongRender()
      this.repeatSongRender()
      this.clickPlayList()
      this.clickPlayList()
  }
}

app.start()

