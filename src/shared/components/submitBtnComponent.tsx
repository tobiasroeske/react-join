import classNames from "classnames"

export function SubmitBtn({ text, disabled }: { text: string, disabled: boolean }) {
    return (
        <button type='submit' className={classNames("loginBtn", { ['disabled-btn']: disabled })}>{text}</button>
    )
}