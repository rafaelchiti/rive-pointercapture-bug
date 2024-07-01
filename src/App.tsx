import { useRive } from "@rive-app/react-canvas";
import bubbleRive from "./sparks-blob-v1.riv?url";

function App() {
  const { RiveComponent } = useRive({
    src: bubbleRive,
    stateMachines: "blob-v1",
    autoplay: true,
  });

  return (
    <div
      className="size-full flex items-center justify-center bg-[#B2EEFF] touch-none"
      onPointerMove={(event) => {
        // If we don't capture the pointer here, and we start the drag outside
        // the rive canvsa, then the pointer events are not going to get detected
        // by the rive canvas.
        const currentElementAtPoint = document.elementFromPoint(
          event.clientX,
          event.clientY
        );
        if (currentElementAtPoint?.id === "rive-canvas") {
          currentElementAtPoint?.setPointerCapture(event.pointerId);
        }
        console.log(":: onPointerMove (parent)");
      }}
    >
      <div className="ring-1 size-[400px]">
        <RiveComponent
          id="rive-canvas"
          onPointerMove={() => {
            console.log(":: onPointerMove (rive component / canvas)");
          }}
        />
      </div>
    </div>
  );
}

export default App;
