/* eslint-disable no-restricted-globals */
import { useCallback, useEffect, useRef } from "react";
import point from "./img/point.png";

const channel = new BroadcastChannel("my-channel");

export default function App() {
  const queryParameters = new URLSearchParams(window.location.search);

  const isClient = queryParameters.get("client");

  const ref = useRef<HTMLImageElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const messageHandler = useCallback((event: MessageEvent<any>) => {
    if (!isClient) {
      return;
    }

    if (event.data.type === "mouse") {
      const transform = `translate(${event.data.message.x - 12}px, ${
        event.data.message.y - 12
      }px)`;

      if (ref.current) {
        ref.current.style.transform = transform;
      }
    }

    if (event.data.type === "scroll") {
      if (divRef.current) {
        divRef.current.scrollTo({ top: event.data.message });
      }
    }

    if (event.data.type === "navigate") {
      window.location.href = "http://www.google.com";
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      channel.addEventListener("message", messageHandler);

      sessionStorage.setItem("connection", "client");
    }

    return () => {
      channel.removeEventListener("message", messageHandler);
    };
  }, [isClient, messageHandler]);

  const onMouseMove = (e: MouseEvent) => {
    const menssage = {
      type: "mouse",
      message: { x: e.clientX, y: e.clientY },
    };

    channel.postMessage(menssage);
  };

  const handleScroll = (event: any) => {
    const { scrollTop } = event.target;

    channel.postMessage({ type: "scroll", message: scrollTop });
  };

  useEffect(() => {
    addEventListener("mousemove", onMouseMove, true);

    return () => {
      removeEventListener("mousemove", onMouseMove, true);
    };
  }, []);

  const reloadMirror = () => {
    window.location.href = "http://www.google.com";

    channel.postMessage({ type: "navigate" });
  };

  return (
    <div
      ref={divRef}
      onScroll={handleScroll}
      style={{
        overflowY: "scroll",
        height: "100dvh",
        gap: 24,
      }}
    >
      {isClient && (
        <img
          id="fake-cursor"
          ref={ref}
          style={{
            position: "absolute",
            zIndex: 1000,
          }}
          src={point}
          width={24}
          alt="cursor"
        />
      )}

      <button onClick={reloadMirror}>Navigate Google Mirror Window</button>
      <p style={{ fontSize: 32 }}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate
        quaerat nobis earum ducimus facilis. Accusamus dolore ullam accusantium
        ipsa obcaecati quas voluptatum odio, quia, aspernatur non assumenda!
        Ipsam, quam eum!
      </p>
      <p style={{ fontSize: 32 }}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate
        quaerat nobis earum ducimus facilis. Accusamus dolore ullam accusantium
        ipsa obcaecati quas voluptatum odio, quia, aspernatur non assumenda!
        Ipsam, quam eum!
      </p>
      <p style={{ fontSize: 32 }}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate
        quaerat nobis earum ducimus facilis. Accusamus dolore ullam accusantium
        ipsa obcaecati quas voluptatum odio, quia, aspernatur non assumenda!
        Ipsam, quam eum!
      </p>
      <p style={{ fontSize: 32 }}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate
        quaerat nobis earum ducimus facilis. Accusamus dolore ullam accusantium
        ipsa obcaecati quas voluptatum odio, quia, aspernatur non assumenda!
        Ipsam, quam eum!
      </p>
      <p style={{ fontSize: 32 }}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate
        quaerat nobis earum ducimus facilis. Accusamus dolore ullam accusantium
        ipsa obcaecati quas voluptatum odio, quia, aspernatur non assumenda!
        Ipsam, quam eum!
      </p>
      <p style={{ fontSize: 32 }}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate
        quaerat nobis earum ducimus facilis. Accusamus dolore ullam accusantium
        ipsa obcaecati quas voluptatum odio, quia, aspernatur non assumenda!
        Ipsam, quam eum!
      </p>
      <p style={{ fontSize: 32 }}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate
        quaerat nobis earum ducimus facilis. Accusamus dolore ullam accusantium
        ipsa obcaecati quas voluptatum odio, quia, aspernatur non assumenda!
        Ipsam, quam eum!
      </p>
      <p style={{ fontSize: 32 }}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate
        quaerat nobis earum ducimus facilis. Accusamus dolore ullam accusantium
        ipsa obcaecati quas voluptatum odio, quia, aspernatur non assumenda!
        Ipsam, quam eum!
      </p>
      <p style={{ fontSize: 32 }}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate
        quaerat nobis earum ducimus facilis. Accusamus dolore ullam accusantium
        ipsa obcaecati quas voluptatum odio, quia, aspernatur non assumenda!
        Ipsam, quam eum!
      </p>
      <p style={{ fontSize: 32 }}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate
        quaerat nobis earum ducimus facilis. Accusamus dolore ullam accusantium
        ipsa obcaecati quas voluptatum odio, quia, aspernatur non assumenda!
        Ipsam, quam eum!
      </p>
    </div>
  );
}
