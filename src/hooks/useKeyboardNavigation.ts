import { KeyboardEvent, useEffect, useRef, useState } from "react";

type KeyboardNavigationHandlers<TItem> = {
  onSelect?: (item: TItem, index: number) => void;
  onBackspace?: () => void;
  onEscape?: () => void;
};

/**
 * Drives a list from a text input with the keyboard. ArrowDown and ArrowUp move
 * the active item and wrap around at both ends, Enter selects it, and Backspace
 * and Escape run the caller's handlers. The active item is scrolled into view,
 * and a new list starts with no active item. It works with any kind of list.
 */
export default function useKeyboardNavigation<
  TItem,
  TElement extends HTMLElement = HTMLDivElement,
>(items: readonly TItem[], handlers: KeyboardNavigationHandlers<TItem> = {}) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const activeItemRef = useRef<TElement>(null);

  useEffect(() => {
    setActiveIndex(-1);
  }, [items]);

  useEffect(() => {
    activeItemRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [activeIndex]);

  const handleKeyDown = (event: KeyboardEvent) => {
    const count = items.length;

    switch (event.key) {
      case "ArrowDown":
        if (count === 0) return;
        event.preventDefault();
        setActiveIndex((prev) => (prev + 1) % count);
        break;
      case "ArrowUp":
        if (count === 0) return;
        event.preventDefault();
        setActiveIndex((prev) => (prev <= 0 ? count - 1 : prev - 1));
        break;
      case "Enter":
        if (activeIndex < 0 || activeIndex >= count) return;
        event.preventDefault();
        handlers.onSelect?.(items[activeIndex], activeIndex);
        break;
      case "Backspace":
        handlers.onBackspace?.();
        break;
      case "Escape":
        handlers.onEscape?.();
        break;
    }
  };

  return { activeIndex, setActiveIndex, activeItemRef, handleKeyDown };
}
