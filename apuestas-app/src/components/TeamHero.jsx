export function TeamHero({ isReversed, hasResult, equipo, result }) {
    return (
        <div className="flex flex-row items-center gap-5">
            {isReversed && hasResult ? <h2 className="text-3xl font-bold">{result}</h2> : ""}
            <div className="flex flex-col text-center items-center justify-center">
                <img className="h-10 w-10" src="https://seth.usonsonate.edu.sv/img/universidad.png" alt="" />
                <p className="text-sm">{equipo}</p>
            </div>
            {!isReversed && hasResult ? <h2 className="text-3xl font-bold">{result}</h2> : ""
            }
        </div >
    );
};
