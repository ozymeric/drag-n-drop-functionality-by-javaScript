// select all the draggable p tags:
const draggables = document.querySelectorAll(".draggable");

// select all the containers:
const containers = document.querySelectorAll(".container");

// now let's try to create a basic simple function in order to understan how we use dragging in javascript:

function alertDragEvent() {
  console.log("dragging detected !!!");
  this.classList.add("dragging");
}

// we use "dragstart" eventlistener to detect the drag event:
draggables.forEach((draggableItem) => {
  draggableItem.addEventListener("dragstart", alertDragEvent);
});
// with the dragstart eventlistener above, now whenever we drag a draggableItem, we'll be seeing a "dragging detected !!!" console log message on the console. So this is how we detect drag event fundamentaly.

// also when we start draggin our element it's opacity gets another value. The problem is; when we stop sragging it, the opacity stays the same. But we want the opacity to change back to its previous value, but change only while the elements is being dragged. so:

// we create another function to listen for a ""dragend""", and remove the "dragging" class when the drag is ended.
function opacityReset() {
  this.classList.remove("dragging");
}

// and add this function to our eventlistener:
draggables.forEach((draggableItem) => {
  draggableItem.addEventListener("dragstart", alertDragEvent);
  draggableItem.addEventListener("dragend", opacityReset);
});

// now, what we're gonna do is; we're gonna detect when there is a drag event within the borders of our container divs. This is how:

containers.forEach((container) => {
  container.addEventListener("dragover", () => {
    console.log(
      "an item is being dragged within the borders of this container at the moment!!!!"
    );
  });
});

// as you can see on the console in google web tools, when we start dragging an element and keep it within the borders of the container, we'll keep seeing over and over the console log message we wrote up above in the eventlistener function. But the moment we drag out of the container border, the message will stop console logging.

// now let's try to get hold of the dragged element when we start to drag it. Here's how we do it:

// let's use the previous forEach() function and rewrite it in order to get hold of the element which is being dragged at that moment.

containers.forEach((container) => {
  container.addEventListener("dragover", () => {
    const elementBeingDragged = document.querySelector(".dragging");
    // as we've determined a function to add "dragging" class to the element we're currently dragging, to get hold of the dragged element on that moment, we have to target the element which has a "dragging" class, so we'll be able to catch the element which is being dragged on that moment.

    // and now let's add a code to move the dragged element to the end of the container we're in.
    container.appendChild(elementBeingDragged);
    // now, whenever we try to drag an element(p tag), it will automatically move to the end of the container we dragover. If we drag it and stop dragging within the borders of container1, it will move itself to the end of the container1,  and if we drag an element from container1 and stop dragging witin the borders of container2, it will move itself to the end of container2.
  });
});

// and one last thing:
// in our exapmle we're not experiencing this but just in case; normally when we try to drag and drop an element, the default behavior of this action is to not allow drag and drop inside and element, and when we drag and try to drop an element within another element, on the cursor we see "not allowed" cursor symbol. in order to get rid of this, we use preventdefault method. So after preventing default, when we drag and try to drop our element into our target element, the cursor symbol won't be changing to a warning style. But when we try to drop our element into an undropable element, we'll keep seeng the not allowed symbol on the cursor. So we re-write our code like this in order not to get a warning symbol on the cursor:

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const elementBeingDragged = document.querySelector(".dragging");

    container.appendChild(elementBeingDragged);
  });
});

// after adding preventdefault within our code, now when we try to drag and drop our element within targetted containers, we see an encouraging cursor image to declare that dropping here is allowed, but when we keep dragging until we're out of our either container's borders, the "dropping is allowed" cursor image disappears.

// #########################################################################
// #########################################################################
// #########################################################################
// #########################################################################
// #########################################################################
// #########################################################################
// #########################################################################
// #########################################################################
// #########################################################################
// #########################################################################

// TUTOR'S SOLUTION:

// const draggables = document.querySelectorAll(".draggable");
// const containers = document.querySelectorAll(".container");

// draggables.forEach((draggable) => {
//   draggable.addEventListener("dragstart", () => {
//     draggable.classList.add("dragging");
//   });

//   draggable.addEventListener("dragend", () => {
//     draggable.classList.remove("dragging");
//   });
// });

// containers.forEach((container) => {
//   container.addEventListener("dragover", (e) => {
//     e.preventDefault();
//     const afterElement = getDragAfterElement(container, e.clientY);
//     const draggable = document.querySelector(".dragging");
//     if (afterElement == null) {
//       container.appendChild(draggable);
//     } else {
//       container.insertBefore(draggable, afterElement);
//     }
//   });
// });

// function getDragAfterElement(container, y) {
//   const draggableElements = [
//     ...container.querySelectorAll(".draggable:not(.dragging)"),
//   ];

//   return draggableElements.reduce(
//     (closest, child) => {
//       const box = child.getBoundingClientRect();
//       const offset = y - box.top - box.height / 2;
//       if (offset < 0 && offset > closest.offset) {
//         return { offset: offset, element: child };
//       } else {
//         return closest;
//       }
//     },
//     { offset: Number.NEGATIVE_INFINITY }
//   ).element;
// }
