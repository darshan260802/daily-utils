import { HiClipboardCopy } from "react-icons/hi";
import { IoTrash } from "react-icons/io5";

export default function UrlCard(props) {
  let { long, short, num, deleteURL } = props;
  return (
    <div
      className="card lg:card-side mt-2 lg:w-96 break-all md:w-90  sm:w-80 break-words bg-primary text-primary-content bordered m-5"
      style={{ maxWidth: "97vw" }}
    >
      <div className="card-body">
        <h2 className="card-title" id={`link${num}`}>
          {short}
        </h2>
        <span className="">{long}</span>
        <div className="card-actions">
          <button
            className="btn btn-primary"
            title="copy"
            onClick={() =>
              navigator.clipboard.writeText(
                document.getElementById(`link${num}`).innerHTML
              )
            }
          >
            <HiClipboardCopy />
          </button>
          <button class="btn btn-secondary" onClick={() => deleteURL(num)}>
            <IoTrash />
          </button>
        </div>
      </div>
    </div>
  );
}
