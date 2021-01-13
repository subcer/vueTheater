var vm = new Vue({
  el: "#app",
  data:{    
    movies: [],
    cart: [],
    currentMovie: null,
    isCartOpen: true,
  },
  created(){
    let apiUrl = "https://awiclass.monoame.com/api/command.php?type=get&name=movies"
    axios.get(apiUrl).then(res=>{
      this.movies = res.data
    })
  },
  methods: {
    bgcss(url){
      return {
        'background-image': 'url('+url+')',
        'background-position':'center center',
        'background-size':'cover'
      }
    },
    wheel(evt){
      //console.log(evt.deltaY)
      var cardLeft = parseInt($(".cards").css("left")) // 清單left位置
      var cardsWidth = parseInt($(".cards").css("width")) // 清單總寬度
      var cardWidth = parseInt($(".card").css("width")) //單一張寬度
      var reduceWidth = (cardWidth-cardsWidth)+cardWidth/2 //單一張寬度-清單總寬度 
      // console.log(cardLeft)
      console.log(cardsWidth)
      console.log((cardWidth-cardsWidth))
      
      if(cardLeft <= 0 && cardLeft >= reduceWidth){
        TweenMax.to(".cards",0.8,{
          left: "+="+evt.deltaY*2+"px",
        })
      }
      else{
        if(cardLeft > 0){
          TweenMax.to(".cards",0.8,{
            left: 0+"px"
          })
        }
        else if(cardLeft < reduceWidth){
          TweenMax.to(".cards",0.8,{
            left: reduceWidth+"px"
          })
        }
        
      }
    },
    addCart(movie,evt){
      this.currentMovie = movie
      let target = evt.target
      this.$nextTick(()=>{
        TweenMax.from(".buybox",0.8,{
          left: $(evt.target).offset().left,
          top: $(evt.target).offset().top,
          opacity: 1,
          ease: Power1.easeOut
        })
        setTimeout(()=>{
          this.cart.push(movie)
        },800)
      })      
    },
    // snowDown(){
    //   var snowTop = $('.snow').css("top")
    //   if(snowTop >= 600){
    //     $('.snow').css("top","0px")
    //     this.snowDown()
    //   }
    //   else{
    //     TweenMax.to(".snow",6,{
    //       top: 600+"px"
    //     })     
    //   }
    // }
  },
  computed:{
    totalPrice(){
      return this.cart
        .map(movie=>movie.price)
        .reduce((total,p)=>total+p,0)
    }
  },
  watch: {
    cart(){
      TweenMax.from(".fa.fa-shopping-cart",0.3,{
        scale: 0.5
      })
    }
  },
  // mounted(){
  //   this.snowDown()
  // }
})