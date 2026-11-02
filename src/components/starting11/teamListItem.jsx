import React from 'react';
import {useSortable} from '@dnd-kit/react/sortable';


export function TeamListItem({player,id, index}) {
  const {ref, isDragging} = useSortable({
    id,
    index,
    type: 'item',
    accept: 'item',
  });

  return (
    <button className="Item" ref={ref} data-dragging={isDragging}>
      {player.name}
    </button>
  );
}