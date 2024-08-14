import classNames from "classnames"

export function SubmitBtn({ text, disabled }: { text: string, disabled: boolean }) {
    return (
        <button type='submit' disabled={disabled} className={classNames("loginBtn", { ['disabled-btn']: disabled })}>{text}</button>
    )
}