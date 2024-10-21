import React from 'react';
import {StyleSheet} from 'react-native';

import {List} from 'react-native-paper';
import {observer} from 'mobx-react-lite';

import {useTheme} from '../../../hooks';

import {styles} from './styles';

import {modelStore} from '../../../store';

interface ModelAccordionProps {
  group: any;
  expanded: boolean;
  onPress: () => void;
  children: React.ReactNode;
}

export const ModelAccordion: React.FC<ModelAccordionProps> = observer(
  ({group, expanded, onPress, children}) => {
    const {colors} = useTheme();
    const activeModel = modelStore.activeModel;
    const activeGroup = activeModel && activeModel.type === group.type;

    const accordionStyles = StyleSheet.flatten([
      styles.accordion,
      {backgroundColor: colors.surface, borderColor: colors.surfaceVariant},
      activeGroup && {
        backgroundColor: colors.tertiaryContainer,
        borderColor: colors.primary,
      },
    ]);

    return (
      <List.Accordion
        testID={`model-accordion-${group.type}`}
        title={group.type}
        titleStyle={StyleSheet.flatten([
          styles.accordionTitle,
          {color: colors.onSurface},
        ])}
        expanded={expanded}
        onPress={onPress}
        style={accordionStyles}>
        {children}
      </List.Accordion>
    );
  },
);