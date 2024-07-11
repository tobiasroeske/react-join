

export function SubmitBtn({ text, disabled }: { text: string, disabled: boolean }) {
    return (
        <button type='submit' className={"loginBtn " + (disabled ? 'disabled-btn' : '')}>{text}</button>
    )
}