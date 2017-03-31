require('./counter.tag');

<list>
    <div class="content">
        <img if={ imgs.length } src={ imgPath + imgs [pos]} alt={imgs[pos]} />
    </div>
    <div class="nav" if={imgs.length}>
        <div>
            <a href="#" onclick={prev}>&lt;</a>
            <span>{imgs [pos]}</span>
            <a href="#" onclick={next}>&gt;</a>
        </div>
        <counter pos={pos + 1} count={imgs.length}></counter>
    </div>
    
    <script>
        var self = this
        this.imgs = []
        this.pos = 0
        this.refresh = () => $.get('/imgs').then(res => { self.imgs = res.files; self.imgPath = res.imgDir; self.update() })
        this.next = () => this.pos = Math.min(this.pos + 1, this.imgs.length - 1)
        this.prev = () => this.pos = Math.max(this.pos - 1, 0)
        this.init = () => {
            this.refresh();
            $(document).keyup((event)  => {
                switch(event.which){
                    case 32: self.refresh(); break;
                    case 37: self.prev(); break;
                    case 39: self.next(); break;
                }
                console.log(event.which);
                self.update()
            });
        }
        this.on('mount', this.init)
    </script>

  <style>
    :scope { 
        text-align:center;
     }
    .content {
        width: 100%; 
        height: 100%; 
        position: fixed; 
        left: 0px; 
        top: 0px; 
        z-index: -1;
        vertical-align: middle;
    }
   .content img { 
        margin: auto;
        max-width: 100%;
        height: auto;
        width: auto;
    }
    .nav {
        position: fixed;
        bottom: 0;
        width: 100%;
        text-shadow: 3px 3px #333;
    }
    .nav span{
        min-width: 40%;
        display: inline-block;
    }
  </style>
</list>
