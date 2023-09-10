// import packages below
import React, { memo, useState, useEffect, useCallback } from 'react';
import { Box, Input, Button, FormLabel } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Editor, EditorState } from 'draft-js';
import PropTypes from 'prop-types';

// import helpers
import { useAppDispatch } from '@/hooks/redux';
import { create, update } from '@/features/notes/notes-slice';
import convertToEditorState from '@/helpers/convertToEditorState';
import convertToRawState from '@/helpers/convertToRawState';

// import utils below
import { NoteFormProps, NoteFormInputs } from '@/types/note-types';

const NoteForm: React.FC<NoteFormProps> = memo(props => {
  const { note, onClose } = props;

  // store
  const dispatch = useAppDispatch();

  // state
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  // hook form
  const { register, handleSubmit } = useForm<NoteFormInputs>();

  // submit handler
  const onSubmit: SubmitHandler<NoteFormInputs> = useCallback(
    data => {
      const payload = { ...data, body: convertToRawState(editorState) };

      // guard
      if (!payload.title && !payload.body.blocks[0].text) {
        onClose();
        return;
      }

      // dispatch
      dispatch(note ? update({ ...note, ...payload }) : create(payload));

      // close
      onClose();
    },
    [editorState, note, dispatch, onClose],
  );

  // set note
  useEffect(() => {
    note && setEditorState(convertToEditorState(note.body));
  }, [note]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box mb={2}>
        <FormLabel>Title</FormLabel>
        <Input mb={4} type='text' {...register('title', { value: note?.title })} />
      </Box>
      <Box mb={2}>
        <FormLabel>Body</FormLabel>
        <Box px={4} py={2} border='1px solid #e2e8f0' borderRadius={6}>
          <Editor editorState={editorState} onChange={setEditorState} />
        </Box>
      </Box>
      <Button mt={4} type='submit' color='white' colorScheme='black' bg='#353B3C'>
        Save
      </Button>
    </form>
  );
});

export default NoteForm;

NoteForm.propTypes = {
  note: PropTypes.any,
  onClose: PropTypes.func.isRequired,
};