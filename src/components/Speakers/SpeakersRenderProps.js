// Render props:
// A component with a render prop takes a function that returns a React element and calls it instead of implementing its own render logic.

// not used anymore:
// function SpeakersRenderProps(props) {
//     const speakers = [
//         { imageSrc: 'speaker-component-1124', name: 'Douglas Crockford' },
//         { imageSrc: 'speaker-component-1530', name: 'Tamara Baker' },
//         { imageSrc: 'speaker-component-10803', name: 'Eugene Chuvyrov' },
//     ];

//     return props.children({
//         speakers: speakers
//     });
// }
// export default SpeakersRenderProps;