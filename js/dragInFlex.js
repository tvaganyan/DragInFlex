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
                        break;
                    } else {
                        target = target.parentNode;
                    }
                }
                setOrder();
                if (callbackF) {
                    callbackF(D);
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