  enum PIXIEVENT {
    POINTERDOWN ='pointerdown',
    POINTERUP = 'pointerup',
    POINTERUPOUTSIDE = 'pointerupoutside',
    POINTERMOVE = 'pointermove',
    MOUSEDOWN ='mousedown',
    MOUSEUP = 'mouseup',
    MOUSEUPOUTSIDE = 'mouseupoutside',
    MOUSEMOVE = 'mousemove',
    MOUSEOVER = 'mouseover',
    MOUSEOUT = 'mouseout',
  }
  
  interface MouseEventHandler {
      onDragStart: ()=> void;
      onDragMove: ()=> void;
      onDragEnd: ()=> void;
  }
  
  
export {
    PIXIEVENT,
    MouseEventHandler
}