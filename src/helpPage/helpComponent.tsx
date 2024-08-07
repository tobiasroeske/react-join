function Help() {

    function handleClose() {
        window.close()
    }

    return (
        <div className="special-page">

            <a href="summary.html"><img src="assets/img/contact_back_arrow.svg" alt="" className="back-arrow-icon"
            /></a>
            <div className="headline">
                <h1>Help</h1>
                <div onClick={handleClose}>
                    <img src="/assets/icons/back_arrow.png" alt="" />
                </div>
            </div>
            <br />
            <p>Welcome to the help page for <b>Join</b>, your guide to using our kanban project management tool.
                Here, we`ll provide an overview of what <b>Join</b> is, how it can benefit you, and how to use it
            </p> <br />
            <h2>What is Join?</h2>
            <p><b>Join</b> is a kanban-based project managment tool designed and built by a group of dedicated
                students as part of their web development bootcamp at the Developer Akademie. <br /></p>
            <p>Kanban , a Japanese term meaning "billboard", is a highly effective method to visualize work, limit
                work-in-progress, and maximize efficiency (or flow). <b>Join</b> leverages the principles of kanban
                to help users manage their <br /> tasks and projects in an intuitive, visual interface. <br /></p>
            <p>It is important to note that <b>Join</b> is designed as an educational exersice and is not intended
                for extensive business usage. While we strive to ensure the best possible user experience, we cannot
                guarantee consistent availability, reliability, accuracy, or other aspects of quality regarding
                <b>Join</b>. <br /></p> <br />
            <h1>How to use it</h1>
            <p>Here is a step-by-step guide on how to use <b>Join</b>:</p> <br />
            <h2>1. Exploring the Board</h2>
            <p>When u login in to <b>Join</b>, you`ll find a default board. This board represents your projects and
                contains four default lists: "To Do", "In Progress", "Await Feedback" and "Done".</p>
            <h2>2. Creating Contacts</h2>
            <p>In <b>Join</b>, you can add contacts to collaborate on your projects. Go to the "Contacs" section,
                click on "New contact", and fill in the required information. Once added, these contacts can be
                assigned tasks and they can interact with the tasks on the board.</p>
            <h2>3. Adding Cards</h2>
            <p>Now that you`ve added your contacts, you can start adding cards. Cards respresent individual tasks.
                Click the "+" button under the appropiate list to create a new card. Fill in the task details in the
                card, like task name, description, due date, assignees, etc.</p>
            <h2>4. Moving Cards</h2>
            <p>As the task moves from one stage to another, you can refelect that on the board by dragging and
                dropping the card from one list to another.</p>
            <h2>5. Deleting Cards</h2>
            <p>Once a task is completed, you can either move it to the "Done" list or delete it. Deleting a card
                will permanently reemove it from the board. Please exercise caution when deleting cards, as this
                action is irreversible.</p><br />
            <p>Remember that using <b>Join</b> effectively requires consistent updates from you and your team top
                ensure the board reflects the current state of your projects.</p>
            <p>Have more questions about <b>Join</b>? Feel free to contact us at <b>theomellon1@gmail.com</b>. We`re
                here to help you!</p><br />
            <h1>Enjoy using Join!</h1> <br /> <br />
        </div>
    )
}

export default Help;