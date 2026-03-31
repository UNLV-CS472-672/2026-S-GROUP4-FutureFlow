// for JobListing.tsx

type Props = {
    onSave: (goal: string) => void;
};

export default function JobGoal({ onSave }: Props) {

    const [input, setInput] = useState("");

    return (
        <div>
            <input
                value = {input}
                onChange = {(e) => setInput(e.target.value)}
                placeHolder = "Enter Your Goal"
            />
            <button onClick = {() => onSave(input)}> Save Goal </button>
        </div>
    );

}