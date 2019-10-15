﻿// - - - - - - Copyright (C) 2019  T. Vaganyan - - - - - -

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.


        function dragInit(D, callbackF) {
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
                    if (target.dataset && parseInt(target.dataset.n,10) >= 0) {
                        if (parseInt(o.dataset.n,10) > parseInt(target.dataset.n,10)) {
                            D.insertBefore(o, target);
                        } else {
                            D.insertBefore(o, target.nextSibling);
                        }
                        setOrder();
                        if (callbackF) {
                            callbackF(D);
                        }
                        break;
                    } else {
                        target = target.parentNode;
                    }
                }
            }
            function setOrder() {
                var f = D.children;
                for (var i = 0; i < f.length; i++) {
                    f[i].dataset.n = i;
                }
            }
            setOrder();
            var f = D.children;
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
        } 