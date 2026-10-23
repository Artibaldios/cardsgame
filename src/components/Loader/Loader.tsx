import './Loader.css'

interface LoaderProps {
  loaded: number;
  total: number;
}

const Loading = ({ loaded, total }: LoaderProps) => {
  const percentage = total === 0 ? 100 : Math.round((loaded / total) * 100);

  return (
    <div className="loading-screen" role="status" aria-live="polite">
      <div className="loading-spinner" aria-hidden="true"></div>
      <p className="loading-label">Loading</p>
      <div className="loading-track" aria-hidden="true">
        <div className="loading-bar" style={{ width: `${percentage}%` }}></div>
      </div>
      <p className="loading-percentage">{percentage}%</p>
    </div>
  );
};

export default Loading;