export const button = (center) => {

    ///////////////////////////////////////////////////////////////////

    const buttonWidth = 120
    const buttonHeight = 60
    const buttonRadii = [10]
    const buttonX = center.x - buttonWidth / 2
    const buttonY = center.y - buttonHeight / 2

    let idle = true

    ///////////////////////////////////////////////////////////////////

    const contact = (contactPoint) => {
        return (
            contactPoint.x < buttonX + buttonWidth &&
            contactPoint.x > buttonX &&
            contactPoint.y < buttonY + buttonHeight &&
            contactPoint.y > buttonY
        )
    }

    const draw = (ctx) => {

        ctx.save()

        if (idle) {

            ctx.strokeStyle = 'white'
            ctx.fillStyle = 'grey'
            ctx.lineWidth = 3

            ctx.shadowColor = 'white'
            ctx.shadowOffsetX = 4
            ctx.shadowOffsetY = 4

            ctx.beginPath()
            ctx.roundRect(
                buttonX,
                buttonY,
                buttonWidth,
                buttonHeight,
                buttonRadii
            )
            ctx.stroke()
            ctx.fill()
            ctx.closePath()

            ctx.shadowColor = 'rgba(0, 0, 0, 0)';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;

            ctx.fillStyle = 'white'
            ctx.font = '32px sans-serif'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText('Start', center.x, center.y + 3)

        } else {

            ctx.strokeStyle = 'white'
            ctx.fillStyle = 'white'
            ctx.lineWidth = 3

            ctx.shadowColor = 'rgba(0, 0, 0, 0)';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;

            ctx.beginPath()
            ctx.roundRect(
                buttonX,
                buttonY + 4,
                buttonWidth,
                buttonHeight,
                buttonRadii
            )
            ctx.stroke()
            ctx.fill()
            ctx.closePath()

            ctx.fillStyle = 'grey'
            ctx.font = '32px sans-serif'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText('Start', center.x, center.y + 3 + 4)

        }

        ctx.restore()

    }

    const input = (contactPoint) => {
        idle = false
    }

    const release = () => {
        idle = true
    }

    ///////////////////////////////////////////////////////////////////

    return {
        contact,
        draw,
        input,
        release
    }

}