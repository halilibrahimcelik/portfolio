type Props = {
  width?: string;
  height?: string;
};

const GithubIcon = ({ width = '50', height = '50' }: Props) => {
  return (
    <>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={width}
        height={height}
        viewBox='0 0 256 256'
        xmlSpace='preserve'
      >
        <g
          style={{
            stroke: 'none',
            strokeWidth: 0,
            strokeDasharray: 'none',
            strokeLinecap: 'butt',
            strokeLinejoin: 'miter',
            strokeMiterlimit: 10,
            fill: 'none',
            fillRule: 'nonzero',
            opacity: 1,
          }}
        >
          <path
            d='M45 0C20.147 0 0 20.467 0 45.714 0 67.034 14.367 84.944 33.802 90c-.013-5.283-.03-11.763-.04-13.782-12.986 2.869-15.726-5.595-15.726-5.595-2.123-5.481-5.183-6.939-5.183-6.939-4.236-2.943.319-2.883.319-2.883 4.687.334 7.156 4.887 7.156 4.887 4.163 7.249 10.92 5.153 13.584 3.942.419-3.064 1.628-5.157 2.964-6.341-10.368-1.199-21.268-5.265-21.268-23.435 0-5.177 1.824-9.407 4.81-12.728-.485-1.195-2.083-6.018.452-12.55 0 0 3.92-1.274 12.84 4.861 3.724-1.051 7.717-1.578 11.684-1.596 3.967.018 7.963.545 11.694 1.596 8.91-6.135 12.824-4.861 12.824-4.861 2.541 6.532.943 11.355.458 12.55 2.993 3.321 4.804 7.551 4.804 12.728 0 18.214-10.92 22.223-21.315 23.398 1.674 1.472 3.166 4.357 3.166 8.781 0 3.513-.016 11.601-.031 17.74C76.021 84.439 90 66.74 90 45.714 90 20.467 69.853 0 45 0'
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: '#000',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            transform='translate(1.407 1.407)scale(2.81)'
          />
        </g>
      </svg>
    </>
  );
};

export default GithubIcon;
