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
     * @emits: 'on-inputentry' {value: value, error: errorVal} with text, number or other types
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

    $: setValue(field.value);


    const toolbarOptions = [
        [{ 'header': [1, 2, 3, false] }],

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


    onMount(async () => {
        //** load big modules dynamically only when needed
        const { default: Quill } = await import("quill");
        await import('quill/dist/quill.snow.css');

        quill = new Quill(editor, {
            modules: {
                toolbar: toolbarOptions
            },
            theme: "snow",
            placeholder: formText[field.field].tag
        });

        quill.on('editor-change', function(eventName, ...args) {
            checkInput();
        });
    });

    onDestroy( () => {
        quill = null;
    });


    //* functions that mutate local variables
    function setValue(val){
        inValue = val;

        if(quill){
            quill.root.innerHTML = inValue;
            let value = quill.root.innerHTML;
        }
    }

    function checkInput(){
        let value = quill.root.innerHTML;
        dispatch('on-inputentry', {value: value, error: false});
    }

</script>


<div class="editor-wrapper">
    <div bind:this={editor}></div>
</div>
