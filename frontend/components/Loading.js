//loading spinner component con clases tailwind
export default function LoadingSpinner() {
  return (
    <div
      className="text-white fixed left-[45%] top-[45%] min-[880px]:left-[60%] h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
      </span>
    </div>
  );
}
//fixed left-[calc((100% - (22% * 100%)) * 50%)] top-[45%]