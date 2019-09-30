describe('Siskel', function() {
  const { expect } = window.chai;

  const data = [
    {
      title: 'Primer',
      year: 2004,
      rating: 9,
    },
    {
      title: 'Back to the Future',
      year: 1985,
      rating: 10,
    },
  ];

  let model;
  let collection;

  beforeEach(function() {
    sinon.spy(Movies.prototype, 'sort');
    collection = new Movies(data);
    // instantiating a collection invokes sort; reset state
    Movies.prototype.sort.resetHistory();
    model = collection.first();
  });

  afterEach(function() {
    Movies.prototype.sort.restore();
  });

  describe('Movie model like property', function() {
    it('should start out true', function() {
      expect(model.get('like')).to.be.true;
    });

    it('should toggle its state', function() {
      model.toggleLike();
      expect(model.get('like')).to.be.false;
    });
  });

  describe('Movie collection', function() {
    it('should have a default comparator for title', function() {
      expect(collection.comparator).to.equal('title');
    });

    it('should update its comparator', function() {
      collection.sortByField('rating');
      expect(collection.comparator).to.equal('rating');
    });

    it('should trigger sort when the comparator is changed', function() {
      collection.sortByField('rating');
      sinon.assert.called(collection.sort);
    });

    it('should trigger sort when a model changes', function() {
      model.toggleLike();
      sinon.assert.called(collection.sort);
    });
  });

  describe('Movie View', function() {
    let modelView;

    beforeEach(function() {
      sinon.spy(Movie.prototype, 'toggleLike');
      sinon.spy(MovieView.prototype, 'render');
      modelView = new MovieView({ model });
    });

    afterEach(function() {
      MovieView.prototype.render.restore();
      Movie.prototype.toggleLike.restore();
    });

    it('should re-render when the model changes', function() {
      model.toggleLike();
      sinon.assert.called(modelView.render);
    });

    it('should toggle like state of its model', function() {
      modelView.handleClick();
      sinon.assert.called(model.toggleLike);
    });
  });

  describe('Movies View', function() {
    let collectionView;

    beforeEach(function() {
      sinon.spy(MoviesView.prototype, 'render');
      collectionView = new MoviesView({ collection });
    });

    afterEach(function() {
      MoviesView.prototype.render.restore();
    });

    it('should re-render when the collection sorts', function() {
      collection.sort();
      sinon.assert.called(collectionView.render);
    });
  });
});
