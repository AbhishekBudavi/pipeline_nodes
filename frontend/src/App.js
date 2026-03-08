import { PipelineToolbar } from './components/toolbar';
import { PipelineUI } from './components/ui';
import { SubmitButton } from './components/submit';
import { HelpBar } from './components/helpBar';

function App() {
  return (
    <div className="flex flex-col h-screen w-full">
      <PipelineToolbar />
      <HelpBar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;
