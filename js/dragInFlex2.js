// - - - - - - Copyright (C) 2019  T. Vaganyan - - - - - -

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

   function dragInit(d_out, d_in, callbackF) {
            var o;
            function allowDrop(ev) {
                ev.preventDefault();
            }

            function drag(ev) {
                o = ev.target;
            }

            function drop(ev) {
                ev.preventDefault();
                var target = ev.target;
                while (target) {
                    if (target == d_in || target == d_out) {
                        target.appendChild(o);
                        if(callbackF) {
                           callbackF(d_out, d_in);
                        }
                        break;
                    } else {
                        target = target.parentNode;
                    }
                }
            }

            function childDrag(d) {
                var f = d.children;
                for (var i = 0; i < f.length; i++) {
                    f[i].setAttribute("draggable", "true");
                    f[i].addEventListener("dragstart", function (ev) {
                        drag(ev);
                    });
                    f[i].addEventListener("drop", function (ev) {
                        drop(ev);
                    });
                    f[i].addEventListener("dragover", function (ev) {
                        allowDrop(ev);
                    });
                }
                d.addEventListener("drop", function (ev) {
                    drop(ev);
                });
                d.addEventListener("dragover", function (ev) {
                    allowDrop(ev);
                });
            }
            childDrag(d_out);
            childDrag(d_in);
        } 