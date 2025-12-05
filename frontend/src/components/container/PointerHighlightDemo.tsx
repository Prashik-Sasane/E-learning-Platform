import { PointerHighlight } from "../ui/PointerHighlight";

export function PointerHighlightDemo() {
  return (
    <div className="max-w-2xl ml-20 py-20 text-2xl font-bold tracking-tight md:text-4xl text-gray-100">
      The best way to improve your skills is to <PointerHighlight>
        <span>ask doubts & collaborate</span>
      </PointerHighlight>{" "}
    </div>
  );
}
