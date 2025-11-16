
export default class TouchController {

    ///////////////////////////////////////////////////////////////////////////

    constructor(canvas, analogControl, buttonControl) {

        this.touchesTargets = []

        this.canvas = canvas
        this.analogControl = analogControl
        this.buttonControl = buttonControl

        this.canvas.addEventListener('touchstart', this.handleTouchStart)
        this.canvas.addEventListener("touchmove", this.handleTouchMove)
        canvas.addEventListener("touchend", this.handleTouchEnd)

        // // todo: put this somewhere
        // this.canvas.addEventListener('touchstart', (event) => {
        //     event.preventDefault()
        //     const x = event.touches[0].clientX
        //     const y = event.touches[0].clientY
        //     if (analogControl.contact({ x, y })) {
        //         this.startDrag(event, analogControl)
        //     }
        // })

        // // todo: put this somewhere too
        // this.canvas.addEventListener('touchstart', (event) => {
        //     event.preventDefault()
        //     const touch = event.changedTouches[0]
        //     const x = event.touches[0].clientX
        //     const y = event.touches[0].clientY
        //     if (buttonControl.contact({ x, y })) {
        //         if (this.touchesTargets.length === 0) {
        //             canvas.addEventListener("touchend", this.buttonUp)
        //         }
        //         this.touchesTargets.push({
        //             target: buttonControl,
        //             touchIdentifier: touch.identifier,
        //         })
        //         buttonControl.input({ x, y })
        //     }
        // })
    }

    ///////////////////////////////////////////////////////////////////////////

    handleTouchEnd = (event) => {

        event.preventDefault()

        const endingTouchIdentifiers =
            [...event.changedTouches].map(t => t.identifier)

        endingTouchIdentifiers.forEach((touchIdentifier) => {
            const touchTarget = this.touchesTargets.find(
                (tt) => tt.touchIdentifier === touchIdentifier
            )
            touchTarget.target.release()
        })

        this.touchesTargets =
            this.touchesTargets
                .filter(tt =>
                    !endingTouchIdentifiers
                        .some(eti => eti === tt.touchIdentifier)
                )

    }

    handleTouchMove = (event) => {

        event.preventDefault(); // required semicolon

        // there's got to be a better way to do this
        [...event.changedTouches].forEach(touch => {
            const touchTarget = this.touchesTargets.find(
                (tt) => tt.touchIdentifier === touch.identifier
            )

            if (touchTarget.drag) {
                const target = touchTarget.target
                target.input({ x: touch.clientX, y: touch.clientY })
            }

        })

    }

    handleTouchStart = (event) => {

        event.preventDefault()

        const touch = event.changedTouches[0];
        const x = touch.clientX
        const y = touch.clientY

        if (this.analogControl.contact({ x, y })) {

            this.touchesTargets.push({
                target: this.analogControl,
                touchIdentifier: touch.identifier,
                drag: true
            })

            this.analogControl.input({ x: touch.clientX, y: touch.clientY })

        } else if (this.buttonControl.contact({ x, y })) {

            this.touchesTargets.push({
                target: this.buttonControl,
                touchIdentifier: touch.identifier,
            })

            this.buttonControl.input({ x, y })
        }
    }

    ///////////////////////////////////////////////////////////////////////////

    // startDrag = (event, target) => {

    //     const touch = event.changedTouches[0]

    //     if (this.touchesTargets.length === 0) {
    //         this.canvas.addEventListener("touchmove", this.drag)
    //         this.canvas.addEventListener("touchend", this.endDrag)
    //     }

    //     this.touchesTargets.push({
    //         target,
    //         touchIdentifier: touch.identifier,
    //     })

    //     target.input({ x: touch.clientX, y: touch.clientY })
    // }

    // drag = (event) => {

    //     event.preventDefault()

    //         ;[...event.changedTouches].forEach(touch => {
    //             const touchTarget = this.touchesTargets.find(
    //                 (tt) => tt.touchIdentifier === touch.identifier
    //             )

    //             const target = touchTarget.target

    //             target.input({ x: touch.clientX, y: touch.clientY })
    //         })
    // }

    // endDrag = (event) => {

    //     const endingTouchIdentifiers =
    //         [...event.changedTouches].map(t => t.identifier)

    //     endingTouchIdentifiers.forEach((touchIdentifier) => {
    //         const touchTarget = this.touchesTargets.find(
    //             (tt) => tt.touchIdentifier === touchIdentifier
    //         )
    //         touchTarget.target.release()
    //     })

    //     this.touchesTargets =
    //         this.touchesTargets
    //             .filter(tt =>
    //                 !endingTouchIdentifiers
    //                     .some(eti => eti === tt.touchIdentifier)
    //             )

    //     if (this.touchesTargets.length === 0) {
    //         this.canvas.removeEventListener('touchmove', this.drag)
    //         this.canvas.removeEventListener('touchend', this.endDrag)
    //     }

    // }

    ///////////////////////////////////////////////////////////////////////

    // buttonUp = (event) => {

    //     const endingTouchIdentifiers =
    //         [...event.changedTouches].map(t => t.identifier)

    //     endingTouchIdentifiers.forEach((touchIdentifier) => {
    //         const touchTarget = this.touchesTargets.find(
    //             (tt) => tt.touchIdentifier === touchIdentifier
    //         )
    //         touchTarget.target.release()
    //     })

    //     this.touchesTargets =
    //         this.touchesTargets
    //             .filter(tt =>
    //                 !endingTouchIdentifiers
    //                     .some(eti => eti === tt.touchIdentifier)
    //             )

    //     if (this.touchesTargets.length === 0) {
    //         this.canvas.removeEventListener('touchend', this.buttonUp)
    //     }

    // }

}