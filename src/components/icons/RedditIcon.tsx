type Props = {
  width?: string;
  height?: string;
};

const RedditIcon = ({ width = '50', height = '50' }: Props) => {
  return (
    <>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={width}
        height={height}
        viewBox={'0 0 256 256'}
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
          transform='translate(1.407 1.407)scale(2.81)'
        >
          <circle
            cx={45}
            cy={45}
            r={45}
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: '#ff4500',
              fillRule: 'nonzero',
              opacity: 1,
            }}
          />
          <path
            d='M75.011 45c-.134-3.624-3.177-6.454-6.812-6.331a6.6 6.6 0 0 0-4.306 1.823 32 32 0 0 0-17.327-5.537l2.919-14.038 9.631 2.025a4.497 4.497 0 0 0 4.955 3.993c2.472-.268 4.262-2.483 3.993-4.955s-2.483-4.262-4.955-3.993a4.45 4.45 0 0 0-3.4 2.204L48.68 17.987a1.395 1.395 0 0 0-1.667 1.063v.022l-3.322 15.615a32.24 32.24 0 0 0-17.55 5.537 6.56 6.56 0 0 0-9.284.291 6.56 6.56 0 0 0 .291 9.284 6.4 6.4 0 0 0 1.767 1.186q-.068.99 0 1.98c0 10.078 11.745 18.277 26.23 18.277s26.23-8.188 26.23-18.277q.067-.99 0-1.98A6.57 6.57 0 0 0 75.011 45m-45 4.508A4.517 4.517 0 0 1 34.519 45c2.483 0 4.508 2.025 4.508 4.508s-2.025 4.508-4.508 4.508c-2.494-.023-4.508-2.025-4.508-4.508m26.141 12.55v-.179a17.28 17.28 0 0 1-11.119 3.468 17.28 17.28 0 0 1-11.119-3.468 1.215 1.215 0 0 1 1.712-1.711 14.7 14.7 0 0 0 9.362 2.83 14.8 14.8 0 0 0 9.407-2.74 1.267 1.267 0 0 1 1.779.022c.481.492.47 1.297-.022 1.778m-.615-7.718h-.224l.034-.168c-2.483 0-4.508-2.025-4.508-4.508s2.025-4.508 4.508-4.508 4.508 2.025 4.508 4.508a4.5 4.5 0 0 1-4.318 4.676'
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: '#fff',
              fillRule: 'nonzero',
              opacity: 1,
            }}
          />
        </g>
      </svg>
    </>
  );
};

export default RedditIcon;
