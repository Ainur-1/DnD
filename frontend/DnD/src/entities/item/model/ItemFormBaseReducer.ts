import { FormField } from "@/shared/types/IFormField";
import { ArmorType, Item, WeaponAttackType, WeaponDamageType, WeaponProficiencyType, WeaponProperty } from "./types";
import { Dice } from "@/shared/types/domainTypes";

interface ItemFormBaseState {    
  /* common props */
  name: FormField<string>;
  iconBase64: FormField<string | null>;
  weightInPounds: FormField<number>;
  description: FormField<string | null>;
  costInGold: FormField<number>;
  tags: FormField<string[]>;

  /* weapon only */
  damageType?: FormField<WeaponDamageType>;
  attackType?: FormField<WeaponAttackType>;
  proficiencyType?: FormField<WeaponProficiencyType>;
  normalDistanceInFoots?: FormField<number | null>;
  criticalDistanceInFoots?: FormField<number | null>;
  properties?: FormField<WeaponProperty[] | null>;
  hitDice?: FormField<Dice>;
  alternateHitDice?: FormField<Dice | null>;

  /* armor only */
  armorType?: FormField<ArmorType>;
  material?: FormField<string>;
  requiredStrength?: FormField<number | null>;
  hasStealthDisadvantage?: FormField<boolean>;
  maxPossibleDexterityModifier?: FormField<number | null>;
  armorClass?: FormField<number>;
}

enum SelectedItemForm {
    weapon,
    armor,
    stuff,
}

interface ItemFormBaseStateWithFormSelector extends ItemFormBaseState {
    /* form selector */
    selectedForm: SelectedItemForm,
    formError: string | null, 
} 

type ItemFromBaseKeys = keyof ItemFormBaseState;

enum ItemFormBaseActionType {
    setFormError,
    setFormProperty,
    selectForm,
    resetForm,
    validateForm,
}

type ItemFormBaseAction =
  | { type: ItemFormBaseActionType.selectForm; form: SelectedItemForm }
  | { type: ItemFormBaseActionType.setFormProperty; field: ItemFromBaseKeys; value: any; error?: string }
  | { type: ItemFormBaseActionType.setFormError; error: string | null }
  | { type: ItemFormBaseActionType.resetForm; newFormType?: SelectedItemForm}
  | { type: ItemFormBaseActionType.validateForm; };

const initialState: ItemFormBaseStateWithFormSelector = {
    selectedForm: SelectedItemForm.stuff,
    formError: null,

    name: {
        value: "",
        error: null
    },
    iconBase64: {
        value: "",
        error: null
    },
    weightInPounds: {
        value: 0,
        error: null
    },
    description: {
        value: null,
        error: null
    },
    costInGold: {
        value: 0,
        error: null
    },
    tags: {
        value: [],
        error: null
    }
}

function resetWeaponProperties(state: ItemFormBaseStateWithFormSelector) {
    state.damageType = undefined;
    state.attackType = undefined;
    state.proficiencyType = undefined;
    state.normalDistanceInFoots = undefined;
    state.criticalDistanceInFoots = undefined;
    state.properties = undefined;   
    state.hitDice = undefined;
    state.alternateHitDice = undefined;
}

function resetArmorProperties(state: ItemFormBaseStateWithFormSelector) {
    state.armorType = undefined;
    state.material = undefined;
    state.requiredStrength = undefined;
    state.hasStealthDisadvantage = undefined;
    state.maxPossibleDexterityModifier = undefined;
    state.armorClass = undefined;
}

function initArmorProperties(state: ItemFormBaseStateWithFormSelector) {
    state.armorType = {
        value: undefined,
        error: null
    };
    state.material = {
        value: "",
        error: null
    };
    state.requiredStrength = {
        value: null,
        error: null
    };
    state.hasStealthDisadvantage = {
        value: false,
        error: null
    };
    state.maxPossibleDexterityModifier = {
        value: null,
        error: null
    };
    state.armorClass = {
        value: 10,
        error: null
    };
}

function initWeaponProperties(state: ItemFormBaseStateWithFormSelector) {
    state.damageType = {
        value: undefined,
        error: null
    };
    state.attackType = {
        value: undefined,
        error: null
    };
    state.proficiencyType = {
        value: undefined,
        error: null
    };
    state.normalDistanceInFoots = {
        value: undefined,
        error: null
    };
    state.criticalDistanceInFoots = {
        value: undefined,
        error: null
    };
    state.properties = {
        value: undefined,
        error: null
    };   
    state.hitDice = {
        value: undefined,
        error: null
    };
    state.alternateHitDice = {
        value: undefined,
        error: null
    };
}

function getStateWithErrors(original: ItemFormBaseStateWithFormSelector): ItemFormBaseStateWithFormSelector {

}

function reducer(state: ItemFormBaseStateWithFormSelector, action: ItemFormBaseAction):ItemFormBaseStateWithFormSelector  {
    switch (action.type) {
        case ItemFormBaseActionType.resetForm:
            const newState = initialState;
            if (action.newFormType) {
                newState.selectedForm = action.newFormType!;
            }

            return newState;
        case ItemFormBaseActionType.setFormError:
            return {
                ...state,
                formError: action.error,
            };
        
        case ItemFormBaseActionType.selectForm:
            const newSelectFormState = {
                ...state,
                selectedForm: action.form,
            };

            if (action.form == SelectedItemForm.armor) {
                resetWeaponProperties(newSelectFormState);
                initArmorProperties(newSelectFormState);
            } else if (action.form == SelectedItemForm.weapon) {
                resetArmorProperties(newSelectFormState);
                initWeaponProperties(newSelectFormState);
            } else {
                resetWeaponProperties(newSelectFormState);
                resetArmorProperties(newSelectFormState);
            }

            return newSelectFormState;

        case ItemFormBaseActionType.setFormProperty:
            return {
                ...state,
                [action.field]: {
                  value: action.value,
                  error: action.error || null,
                },
              };

        case ItemFormBaseActionType.validateForm:
              return getStateWithErrors(state);
        default:
            return state;
    }

}

function stateToItem(state: ItemFormBaseStateWithFormSelector): Item | null {
    try {
        const base = {
            name: state.name.value!,
            iconUrl: null ?? undefined,
            weightInPounds: state.weightInPounds.value!,
            description: state.description.value ?? undefined,
            costInGold: state.costInGold.value!,
            tags: state.tags.value && state.tags.value?.length > 0 ? state.tags.value : undefined,
        };

        if (state.selectedForm == SelectedItemForm.armor) {
            return {
                ...base,
                armorType: state.armorType!.value!,
                material: state.material!.value!,
                requiredStrength: state.requiredStrength?.value ?? undefined,
                hasStealthDisadvantage: state.hasStealthDisadvantage!.value!,
                maxPossibleDexterityModifier: state.maxPossibleDexterityModifier?.value ?? undefined,
                armorClass: state.armorClass!.value!,
            };
        } else if (state.selectedForm == SelectedItemForm.weapon) {
            return {
                ...base,
                attackType: state.attackType!.value!,
                proficiencyType: state.proficiencyType!.value!,
                damageType: state.damageType!.value!,
                normalDistanceInFoots: state.normalDistanceInFoots?.value ?? undefined,
                criticalDistanceInFoots: state.criticalDistanceInFoots?.value ?? undefined,
                properties: state.properties?.value && state.properties?.value.length > 0 ? state.properties!.value : undefined,
                hitDice: state.hitDice!.value!,
                alternateHitDice: state.alternateHitDice?.value ?? undefined,
            }
        }

        return base;
    } catch {
        return null;
    }
}

function anyError(state: ItemFormBaseState): boolean {
  const hasError = (field?: FormField<any>): boolean => field?.error !== null && field?.error !== undefined;

  // Check common props
  if (
    hasError(state.name) ||
    hasError(state.iconBase64) ||
    hasError(state.weightInPounds) ||
    hasError(state.description) ||
    hasError(state.costInGold) ||
    hasError(state.tags)
  ) {
    return true;
  }

  // Check weapon specific props
  if (
    hasError(state.damageType) ||
    hasError(state.attackType) ||
    hasError(state.proficiencyType) ||
    hasError(state.normalDistanceInFoots) ||
    hasError(state.criticalDistanceInFoots) ||
    hasError(state.properties) ||
    hasError(state.hitDice) ||
    hasError(state.alternateHitDice)
  ) {
    return true;
  }

  // Check armor specific props
  if (
    hasError(state.armorType) ||
    hasError(state.material) ||
    hasError(state.requiredStrength) ||
    hasError(state.hasStealthDisadvantage) ||
    hasError(state.maxPossibleDexterityModifier) ||
    hasError(state.armorClass)
  ) {
    return true;
  }

  // No errors found
  return false;
}


export default reducer;
export type { ItemFormBaseAction, ItemFormBaseStateWithFormSelector};
export {initialState, ItemFormBaseActionType, SelectedItemForm, stateToItem, anyError};


