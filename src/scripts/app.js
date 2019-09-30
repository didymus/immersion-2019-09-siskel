const Movie = Backbone.Model.extend({
  defaults: {
    like: true,
  },

  toggleLike: function() {
    // your code here
    this.set('like', !this.get('like'));
  },
});

const Movies = Backbone.Collection.extend({
  model: Movie,

  initialize: function() {
    // your code here
    this.on('change', () => {
      this.sort();
    });
  },

  comparator: 'title',

  sortByField: function(field) {
    // your code here
    this.comparator = field;
    this.sort();
  },
});

const AppView = Backbone.View.extend({
  events: {
    'click form input': 'handleClick',
  },

  handleClick: function(e) {
    const field = $(e.target).val();
    this.collection.sortByField(field);
  },

  render: function() {
    new MoviesView({
      el: this.$('#movies'),
      collection: this.collection,
    }).render();
  },
});

const MovieView = Backbone.View.extend({
  template: _.template(`
    <div class="movie">
      <div class="like">
        <button><img src="images/<%- like ? \'up\' : \'down\' %>.jpg"></button>
      </div>
      <span class="title"><%- title %></span>
      <span class="year">(<%- year %>)</span>
      <div class="rating">Fan rating: <%- rating %> of 10</div>
    </div>
  `),

  initialize: function() {
    // your code here
  },

  events: {
    'click button': 'handleClick',
  },

  handleClick: function() {
    // your code here
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  },
});

const MoviesView = Backbone.View.extend({
  initialize: function() {
    // your code here
  },

  render: function() {
    this.$el.empty();
    this.collection.forEach(this.renderMovie, this);
  },

  renderMovie: function(movie) {
    const movieView = new MovieView({ model: movie });
    this.$el.append(movieView.render());
  },
});

window.Movie = Movie;
window.Movies = Movies;
window.MovieView = MovieView;
window.MoviesView = MoviesView;
window.AppView = AppView;
