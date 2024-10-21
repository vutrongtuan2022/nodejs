import React, { useState } from "react";
import Button from "./Button/Button";
import TodoList from "./todoList";
import UseEffectCallApi from "./useEffect/EffectCallApi";
import EffectWithDependencies from "./useEffect/EffectWithDependencies";
import EffectDom from "./useEffect/EffectDom";
import EffectTimer from "./useEffect/EffectTimer";
import EffectPreviewAvatar from "./useEffect/EffectPreviewAvatar";
import AvatarPreview from "./AvatarPreview/AvatarPreview";
import FakeChatApp from "./useEffect/FakeChatApp";
import ReducerHook from "./ReducerHook/ReducerHook";
import TodoAppReducerHook from "./ReducerHook/TodoAppReducerHook";
export default function MountedUnmounted() {
  const [show, setShow] = useState(false);
  return (
    <div>
      {/* Mounted  */}
      <Button onClick={() => setShow(!show)}>Toggle</Button>
      {/* Unmounted */}
      {/* {show&&<TodoList/>} */}
      {/* {show&&<UseEffectCallApi/>} */}
      {/* {show && <EffectWithDependencies/>} */}
      {/* {show && <EffectDom/>} */}
      {/* {show&& <EffectTimer/>} */}
      {show && <TodoAppReducerHook />}
      {/* {show&& <EffectPreviewAvatar/>} */}
    </div>
  );
}
