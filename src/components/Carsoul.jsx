import { Component } from 'react';
class Carsoul extends Component {
  state = {
    active: 0,
  };

  render() {
    const { images } = this.props;
    const { active } = this.state;
    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            <img
              key={photo}
              src={photo}
              alt="animal2"
              className={index === active ? 'active' : ''}
              data-index={index}
              onClick={(e) => {
                this.setState({ active: +e.target.dataset.index });
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}
export default Carsoul;