import { HandPalm, Play } from "phosphor-react";
import { createContext, useEffect, useState } from "react";

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";
import { Countdown } from "./components/Countdown";
import { NewCycleForm } from "./components/newCycleForm";

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);


  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0);
    reset();
  }

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id == activeCycleId) {
          return { ...cycle, finishedDate: new Date() };
        } else {
          return cycle;
        }
      }),
    )
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id == activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );

    // loop each cycle inside cycles,
    // for every looped cycled, CHECK if id matches,
    // if it does, return the cycle AS DESCRIBED.
    // IF DOESNT MATCH, return it unaltered.

    setActiveCycleId(null);
  }

  

  

  const task = watch("task");
  const isSubmitDisable = !task;

  console.log(cycles);

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
      <CyclesContext.Provider value={{activeCycle, activeCycleId, markCurrentCycleAsFinished}}>
        <NewCycleForm/>
        <Countdown/>
      </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisable} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
