import React from 'react';
import {useDroppable} from '@dnd-kit/react';
import {CollisionPriority} from '@dnd-kit/abstract';

// export function Column({children, id}) {
//   const {isDropTarget, ref} = useDroppable({
//     id,
//     type: 'column',
//     accept: 'item',
//     collisionPriority: CollisionPriority.Low,
//   });
//   const style = isDropTarget ? {background: 'blue'} : undefined;

//   return (
//     <div className="Column" ref={ref} style={style}>
//       {children}
//     </div>
//   );
// }

import {useSortable} from '@dnd-kit/react/sortable';

export function Column({children, id, index}) {
  const {ref} = useSortable({
    id,
    index,
    type: 'column',
    collisionPriority: CollisionPriority.Low,
    accept: ['item', 'column'],
  });

  return (
    <div className="Column" ref={ref}>
      {children}
    </div>
  );
}