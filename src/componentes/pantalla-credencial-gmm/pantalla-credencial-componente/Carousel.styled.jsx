import styled from "styled-components";

const CarouselWrapper = styled.div`
  &.carousel-container {
    max-width: 272px;
    filter: drop-shadow(0px 12px 30px rgba(50, 50, 50, 0.2));

    /* Total-width (including margin) + 1 additional margin */

    @media (min-width: 360px) {
      max-width: 580px;
    }

    @media (min-width: 410px) {
      max-width: 720px;
    }

    @media (min-width: 840px) {
      max-width: 960px;
    }
  }

  .carousel__inner-slide {
    /* width: 100% - margin */
    width: calc(100% - 16px);
    /* margin-left: margin/2 */
    /* margin is required to adjust positioning as the width is diminished*/
    margin-left: 8px;

    @media (min-width: 1272px) {
      width: calc(100% - 24px);
      margin-left: 12px;
    }

    @media (min-width: 1272px) {
      width: calc(100% - 32px);
      margin-left: 16px;
    }
  }
`;

const Wrapper = styled.div`
  .controls {
    display: flex;
    align-items: center;
    justify-content: center;

    .dot-group {
      display: flex;
      align-items: center;
      justify-content: center;
      top: 20px;

      .carousel__dot {
        width: 8px;
        height: 8px;
        border: 2px;
        border-radius: 50%;
        margin: 0 4px;
        padding: 0;
        background-color: #000;
      }

      .carousel__dot--selected {
        width: 16px;
        height: 8px;
        border-radius: 50%;
        background-color: #65a518;
        transition: background 0.4s ease;
      }
    }
  }
`;

export { CarouselWrapper, Wrapper };
