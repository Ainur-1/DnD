import { ArmorType, Item, WeaponDamageType, WeaponProperty } from "../model/types";
import { ReactNode, useContext, useState,  createContext, useReducer, Dispatch } from "react";
import { Divider, FormControlLabel, FormGroup, Grid, Switch, TextareaAutosize, TextField } from "@mui/material";
import { tryParseNumber } from "@/shared/utils/parsers";
import { SelectedItemForm } from "../model/itemFormBaseReducer";
import TagInput from "@/shared/ui/TagInput";
import { ArmorTypeSelector, WeaponAttackTypeSelector, WeaponDamageTypeSelector, WeaponProficiencyTypeSelector } from "./EnumSelectors";
import WeaponPropertiesAutocomplete from "./WeaponPropertiesAutocomplete ";
import { } from 'react';
import reducer, { initialState, ItemFormBaseAction, ItemFormBaseStateWithFormSelector } from '../model/itemFormBaseReducer';
import { DiceSelector } from "@/shared/ui/DiceSelector";


const ItemFormBaseStateContext = createContext<ItemFormBaseStateWithFormSelector>(initialState);
const ItemFormBaseDispatchContext = createContext<Dispatch<ItemFormBaseAction> | undefined>(undefined);

const ItemFormBaseStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ItemFormBaseStateContext.Provider value={state}>
      <ItemFormBaseDispatchContext.Provider value={dispatch}>
        {children}
      </ItemFormBaseDispatchContext.Provider>
    </ItemFormBaseStateContext.Provider>
  );
};

export { ItemFormBaseStateProvider, ItemFormBaseStateContext, ItemFormBaseDispatchContext };


function WeaponSpecificBody() {
    const state = useContext(ItemFormBaseStateContext);
    const dispatch = useContext(ItemFormBaseDispatchContext);
    
    if (!state || !dispatch) {
        throw new Error('ItemFormBaseBody must be used within a ItemFormBaseStateProvider');
    }

    return <>
        <Divider/>
        <Grid item sm={6} xs={6}>
            <WeaponAttackTypeSelector onValueChange={(e) => {}} />
        </Grid>
        <Grid item sm={6} xs={6}>
            <WeaponProficiencyTypeSelector onValueChange={(e) => {}} />
        </Grid>
        <Grid item xs={12}>
            <WeaponDamageTypeSelector onValueChange={function (value: WeaponDamageType): void {
                throw new Error("Function not implemented.");
            } } />
        </Grid>
        {
            state.damageType?.value == WeaponDamageType.melee && 
            <>
                <Grid item sm={6} xs={6}>
                    <TextField
                      value={state.normalDistanceInFoots!.value}
                      error={state.normalDistanceInFoots!.error != null}
                      helperText={state.normalDistanceInFoots!.error}
                      fullWidth
                      label="Дистанция"
                      required
                      type="number"
                    />
                </Grid>
                <Grid item sm={6} xs={6}>
                    <TextField
                      value={state.criticalDistanceInFoots!.value}
                      error={state.normalDistanceInFoots!.error != null}
                      helperText={state.normalDistanceInFoots!.error}
                      fullWidth
                      label="Критическая дистанция"
                      required
                      type="number"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                      value={state.criticalDistanceInFoots!.value}
                      error={state.normalDistanceInFoots!.error != null}
                      helperText={state.normalDistanceInFoots!.error}
                      fullWidth
                      label="Критическая дистанция"
                      required
                      type="number"
                    />
                </Grid>
            </>
        }
        <Grid item xs={12}>
            <WeaponPropertiesAutocomplete selectedProperties={[]} setSelectedProperties={function (properties: WeaponProperty[]): void {
                throw new Error("Function not implemented.");
            }}/>
        </Grid>
        <Grid item xs={6} sm={6}>
            <DiceSelector id="Hit" selectorLabel="Урон" required onValueChange={} />
        </Grid>
        <Grid item xs={6} sm={6}>
            { 
                state.properties?.value?.includes(WeaponProperty.versatile) &&
                 <DiceSelector id="AlternateHit" selectorLabel="Алтернативный урон" required onValueChange={} />
            }
        </Grid>
    </>
}

function ArmorSpesificBody() {
    const state = useContext(ItemFormBaseStateContext);
    const dispatch = useContext(ItemFormBaseDispatchContext);
    
    if (!state || !dispatch) {
        throw new Error('ItemFormBaseBody must be used within a ItemFormBaseStateProvider');
    }

    const handleStealthDisadvantageSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    }

    const handleRequiredStrengthSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    }

    const handleMaxDexteritySwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    }

    return <>
        <Divider />
        <Grid item sm={6} xs={6}>
            <ArmorTypeSelector onValueChange={(e) => {}} />
        </Grid>
        <Grid item sm={6} xs={6}>
            <TextField
            disabled={state.armorType!.value === ArmorType.shield}
            value={state.armorType!.value === ArmorType.shield ? 2 : state.armorClass!.value}
            error={state.armorClass!.error != null}
            helperText={state.armorClass!.error}
            fullWidth
            label="Класс доспеха"
            required={state.armorType!.value !== ArmorType.shield}
            />
        </Grid>
        <Grid item sm={12} xs={12}>
            <TextField
            value={state.material!.value}
            error={state.material!.error != null}
            helperText={state.material!.error}
            fullWidth
            label="Материал"
            required
        />
        </Grid>
        <Grid item sm={12} xs={12}>
            <FormControlLabel
                control={<Switch 
                    value={state.hasStealthDisadvantage!.value != null}
                    onChange={handleStealthDisadvantageSwitchChange}
                    color="secondary" />}
                label="Помеха для Скрытности"
                labelPlacement="start"
            />
        </Grid>
        <Grid item sm={12} xs={12}>
            <FormGroup>
                <FormControlLabel
                    control={<Switch 
                        value={state.maxPossibleDexterityModifier!.value != null}
                        onChange={}
                        color="secondary" />}
                    label="Установить ограничение по Ловкости."
                    labelPlacement="start"
                />
                {state.maxPossibleDexterityModifier!.value != null && 
                        <TextField
                            value={state.maxPossibleDexterityModifier!.value}
                            error={state.maxPossibleDexterityModifier!.error != null}
                            helperText={state.maxPossibleDexterityModifier!.error}
                            fullWidth
                            label="Макс. модификатор Ловкости"
                            required
                            type="number"
                />}
            </FormGroup>
        </Grid>
        <Grid item sm={12} xs={12}>
            <FormGroup>
                <FormControlLabel
                    control={<Switch 
                        value={state.requiredStrength!.value != null}
                        onChange={}
                        color="secondary" />}
                    label="Установить ограничение по Cиле."
                    labelPlacement="start"
                />
                {state.requiredStrength!.value != null && 
                        <TextField
                            value={state.requiredStrength!.value}
                            error={state.requiredStrength!.error != null}
                            helperText={state.requiredStrength!.error}
                            fullWidth
                            label="Необходимая Сила"
                            required
                            type="number"
                />}
            </FormGroup>
        </Grid>
    </>
}


interface ItemFormBaseBodyProps {
}

export function ItemFormBaseBody({}: ItemFormBaseBodyProps) {
    const state = useContext(ItemFormBaseStateContext);
    const dispatch = useContext(ItemFormBaseDispatchContext);
    if (!state || !dispatch) {
        throw new Error('ItemFormBaseBody must be used within a ItemFormBaseStateProvider');
    }

    return <>
            <Grid item xs={12}>
                <TextField
                  value={state.name.value}
                  error={state.name.error != null}
                  helperText={state.name.error}
                  required
                  fullWidth
                  label="Название предмета"
                  autoFocus
                  type="text"
                />
            </Grid>
            <Grid item xs={12}>
                {/* todo: сохранять картинки */}
                <TextField
                  disabled
                  fullWidth
                  label="Иконка"
                  type="file"                  
                />
            </Grid>
            <Grid item xs={6} sm={6}>
                <TextField
                  value={state.weightInPounds.value}
                  error={state.weightInPounds.error != null}
                  helperText={state.weightInPounds.error}
                  fullWidth
                  label="Вес в фунтах"
                  required
                  type="number"
                />
            </Grid>
            <Grid item xs={6} sm={6}>
                <TextField
                  value={state.costInGold.value}
                  error={state.costInGold.error != null}
                  helperText={state.costInGold.error}
                  fullWidth
                  label="Стоимость в золоте"
                  required
                  type="number"
                />
            </Grid>
            <Grid item xs={12}>
                <TextareaAutosize 
                    minRows={3} 
                    placeholder="Краткое описание"
                    value={state.description.value ?? ""}
                />
            </Grid>
            <Grid item xs={12}>
                <TagInput 
                    inputPlaceHolder="Тэги?"
                    tags={state.tags.value}
                    setTags={(tags) => {}}
                />
            </Grid>
            {state.selectedForm == SelectedItemForm.armor && <ArmorSpesificBody/>}
            {state.selectedForm == SelectedItemForm.weapon && <WeaponSpecificBody/>}
    </>
}

interface ItemFormProps {
    chracterId: string,
}
export default function ItemForm({}: ItemFormProps) {
    const [item, setItem] = useState<Item | null>();
    const [count, setCount] = useState(1);
    const [countError, setCountError] = useState("");
    const [itemInUse, setItemInUse] = useState(false);
    const [itemProficiency, setItemProficiencyOn] = useState(false);
    
    const onCountChange = (str: string) => {
        const {success, value} = tryParseNumber(str);
        if (success) {
            const floor = Math.floor(value!);
            if (floor < 1) {
                setCount(1);
                setCountError("Не меннее 1 предмета.");
            } else {
                setCount(floor);
                setCountError("");
            }
        } else {
            setCountError("Не число.")
            setCount(1);
        }
    };

    return <ItemFormStrict>
        <Divider/>
        <FormGroup>
            <TextField 
                value={count}
                onChange={(e) => onCountChange(e.target.value.trim())} 
                margin="normal" 
                required 
                fullWidth  
                label="Количество предметов" 
                type="number" 
                autoFocus
                helperText={countError}
                error={countError != ""}
            />
            <FormControlLabel control={<Switch value={itemInUse} onChange={() => setItemInUse(x => !x)} />} label="Сразу экипировать" labelPlacement="start" />
            <FormControlLabel control={<Switch value={itemProficiency} onChange={() => setItemProficiencyOn(x => !x)} />} label="Владение предметом" labelPlacement="start" />
        </FormGroup>

    </ItemFormStrict>
}