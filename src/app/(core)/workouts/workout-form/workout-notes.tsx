"use client";

import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import WorkoutNotesDialog from "./workout-notes-dialog";
import WorkoutNotesDeleteDialog from "./workout-notes-delete-dialog";

export default function WorkoutNotes({
  notes,
  onUpdate,
}: {
  notes: string | null;
  onUpdate: (notes: string) => void;
}) {
  const [notesOpen, setNotesOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  function handleUpdateNotes(notes: string) {
    onUpdate(notes);
  }

  function handleDeleteNotes() {
    setDeleteDialogOpen(false);
    onUpdate("");
  }

  return (
    <>
      <WorkoutNotesDialog
        key={`${notesOpen}-${notes}`}
        isOpen={notesOpen}
        onOpenChange={setNotesOpen}
        notes={notes}
        onConfirm={handleUpdateNotes}
      />

      <WorkoutNotesDeleteDialog
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteNotes}
      />

      {!notes && (
        <Button
          onClick={() => setNotesOpen(true)}
          className="text-muted-foreground flex w-full items-center justify-start gap-2"
          variant="ghost"
        >
          <PencilIcon />
          <p>Add notes here</p>
        </Button>
      )}

      {notes && (
        <div>
          <p className="break-words whitespace-pre-wrap">{notes}</p>
          <div className="flex items-center gap-2">
            <Button onClick={() => setNotesOpen(true)} variant="ghost">
              <PencilIcon />
              Edit
            </Button>
            <Button onClick={() => setDeleteDialogOpen(true)} variant="ghost">
              <TrashIcon />
              Delete
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
