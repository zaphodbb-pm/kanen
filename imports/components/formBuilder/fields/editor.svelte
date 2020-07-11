<script>
    /**
     * Field component for Quill editor.
     *
     * @memberof Components:Form
     * @function editor
     * @locus Client
     * @augments fieldWrapper
     *
     * @param {Object} field
     *
     * @emits 'on-inputentry' {value: value, error: errorVal} with text, number or other types
     *
     * @see Quill editor {@link https://quilljs.com/docs/formats/|toolbar setup}
     *
     * @notes
     *      1. some css over-rides have been applied.
     *         See '/imports/client/css/starter-custom/starter_override.scss'; line 36
     *
     */

    //* common props from parent
    export let field = {};


    //* support functions
    import {onMount, onDestroy, getContext, createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    let formText = getContext("formText");

    //* local reactive variable
    let inValue = "";

    let editor;
    let quill;
    let table;

    $: setValue(field.value);


    //* editor toolbar configuration
    const toolbarOptions = [
        [{ 'header': [2, 3, 4, false] }],

        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        [{ 'align': [] }],
        ['blockquote', 'code-block'],

        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        ["link", "image", "video"],

        ['clean']                                         // remove formatting button
    ];


    //* event handlers
    function checkInput(){
        let value = quill.root.innerHTML;
        dispatch('on-inputentry', {value: value, error: false});
    }

    function actionTable(type){
        switch(type){
            case "insert-table":
                table.insertTable(3, 3);

                //** add class for system css
                let doc = document.querySelector(".ql-editor");
                let elTable = doc.getElementsByTagName("table");

                Object.values(elTable).forEach( (et) => {
                    et.className = "kanen-custom-table"
                })

                break;

            case "delete-table":
                table.deleteTable();
                break;

            case "insert-row-above":
                table.insertRowAbove();
                break;

            case "insert-row-below":
                table.insertRowBelow();
                break;

            case "delete-row":
                table.deleteRow();
                break;

            case "insert-column-left":
                table.insertColumnLeft();
                break;

            case "insert-column-right":
                table.insertColumnRight();
                break;

            case "delete-column":
                table.deleteColumn();
                break;
        }
    }

    //* functions that mutate local variables
    function setValue(val){
        inValue = val;

        if(quill){
            quill.root.innerHTML = inValue;
            let value = quill.root.innerHTML;
        }
    }


    //* lifecycle states
    onMount(async () => {
        //** load big modules dynamically only when needed
        const { default: Quill } = await import("./editor");
        await import('./editor.css');

        quill = new Quill(editor, {
            theme: "snow",
            modules: {
                toolbar: toolbarOptions,
                table: true,
            },
            placeholder: formText[field.field].tag
        });

        table = quill.getModule('table');

        quill.on('editor-change', function(eventName, ...args) {
            checkInput();
        });
    });

    onDestroy( () => {
        quill = null;
    });

</script>


<div class="editor-wrapper">
    <div bind:this={editor}></div>

    <div class="quill-table-buttons">
        <div class="buttons are-small my-2">
            <button class="button" on:click|preventDefault={() => actionTable("insert-table")}>Insert Table</button>
            <button class="button is-danger" on:click|preventDefault={() => actionTable("delete-table")}>Delete Table</button>
        </div>

        <div class="buttons are-small mb-2">
            <button class="button" on:click|preventDefault={() => actionTable("insert-row-above")}>Insert Row Above</button>
            <button class="button" on:click|preventDefault={() => actionTable("insert-row-below")}>Insert Row Below</button>
            <button class="button is-danger" on:click|preventDefault={() => actionTable("delete-row")}>Delete Row</button>

        </div>

        <div class="buttons are-small">
            <button class="button" on:click|preventDefault={() => actionTable("insert-column-left")}>Insert Column Left</button>
            <button class="button" on:click|preventDefault={() => actionTable("insert-column-right")}>Insert Column Right</button>
            <button class="button is-danger" on:click|preventDefault={() => actionTable("delete-column")}>Delete Column</button>
        </div>

    </div>
</div>
