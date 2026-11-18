import type { Metadata } from "next";

import { AccentRule } from "@/components/ui/accent-rule";
import { AccentUnderline } from "@/components/ui/accent-underline";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DotMatrix } from "@/components/ui/dot-matrix";
import {
  Expandable,
  ExpandableBody,
  ExpandableScope,
  ExpandableToggle,
} from "@/components/ui/expandable";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { HeadlineDot } from "@/components/ui/headline-dot";
import { Icon, iconNames } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { IconChip } from "@/components/ui/icon-chip";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StepBadge } from "@/components/ui/step-badge";
import { Switch } from "@/components/ui/switch";
import { SystemIcon } from "@/components/ui/system-icon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { BadgePlayground } from "../_components/badge-playground";
import { ButtonPlayground } from "../_components/button-playground";
import { DocHeader, DocSection, Specimen } from "../_components/doc-kit";
import { IconChipPlayground } from "../_components/icon-chip-playground";
import { TabsPlayground } from "../_components/tabs-playground";

export const metadata: Metadata = {
  title: "Components — CivicChain Brand",
  description:
    "CivicChain component docs: shared primitives, public props, and code-level usage.",
};

export default function BrandComponentsPage() {
  return (
    <main className="section-flow pb-16 lg:pb-24">
      <DocHeader
        id="components-hero"
        eyebrow="Components"
        title="Shared primitives."
        lede="Shared components from components/ui, labelled by real code name. Use public props first. className is for layout unless you are changing the component owner."
      />

      <DocSection
        id="components-actions"
        title="Button"
        note={'Use props rather than call-site styling. Reserve looks: Button variant="soft", Button size="2xl", and Tabs size="2xl" are defined but have zero production consumers; keep them documented, not assumed as defaults.'}
      >
        <div className="grid gap-10">
          <ButtonPlayground />

          <Specimen
            name="Button asChild"
            api="asChild"
            note="Use when another element owns the semantics, such as navigation. Button supplies the visual shell only."
          >
            <Button asChild>
              <a href="/brand/components">Component docs</a>
            </Button>
          </Specimen>
        </div>
      </DocSection>

      <DocSection
        id="components-tabs"
        title="Tabs"
        note="Tabs owns ARIA behavior and keyboard navigation. Choose variant, trigger size, and tone; do not rebuild tablists locally."
      >
        <TabsPlayground />
      </DocSection>

      <DocSection
        id="components-controls"
        title="Form controls"
        note="Use Field with controls and helper text. Avoid custom label/input spacing."
      >
        <div className="grid gap-10">
          <Specimen
            name="Field · Input · InputGroup"
            api="FieldLabel · FieldDescription · InputGroupTextarea"
          >
            <div className="grid w-full max-w-md gap-4">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="brand-input">Labelled input</FieldLabel>
                  <Input id="brand-input" placeholder="Project record" />
                  <FieldDescription>
                    Helper text belongs in FieldDescription, not a separate caption.
                  </FieldDescription>
                </Field>
                <InputGroup>
                  <InputGroupAddon>
                    <SystemIcon name="globe" className="size-4" />
                  </InputGroupAddon>
                  <InputGroupInput placeholder="civic-chain.com" />
                </InputGroup>
                <InputGroup>
                  <InputGroupAddon className="items-start pt-3">
                    <SystemIcon name="note" className="size-4" />
                  </InputGroupAddon>
                  <InputGroupTextarea placeholder="Message for the record owner" />
                </InputGroup>
              </FieldGroup>
            </div>
          </Specimen>

          <Specimen
            name="Invalid field · destructive Alert"
            api={'FieldError · Alert variant="destructive"'}
            note="Put the invalid state on Field to mark the group, and on the control for accessible form state."
          >
            <div className="grid w-full max-w-lg gap-4">
              <Field data-invalid="true">
                <FieldLabel htmlFor="brand-invalid-input">Access code</FieldLabel>
                <Input
                  id="brand-invalid-input"
                  aria-describedby="brand-invalid-input-error"
                  aria-invalid="true"
                  data-invalid="true"
                  defaultValue="0000"
                />
                <FieldError id="brand-invalid-input-error">
                  Use the current code from the record owner.
                </FieldError>
              </Field>
              <Alert variant="destructive">
                <SystemIcon name="close" />
                <AlertTitle>Invalid state</AlertTitle>
                <AlertDescription>
                  Use destructive Alert for page-level or form-level failure,
                  not for routine helper text.
                </AlertDescription>
              </Alert>
            </div>
          </Specimen>

          <Specimen name="Select" api="SelectTrigger · SelectContent · SelectItem" hint="Click to open the listbox">
            <div className="grid w-full max-w-xs gap-2">
              <Select defaultValue="approved">
                <SelectTrigger>
                  <SelectValue placeholder="Choose state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Specimen>

          <Specimen name="Checkbox · Switch" hint="Click to toggle">
            <label className="flex items-center gap-3 body-sm">
              <Checkbox defaultChecked />
              <span>Show evidence label</span>
            </label>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 body-sm">
              <span className="inline-flex items-center gap-3">
                <Switch aria-label="Notifications off" />
                <span>Off</span>
              </span>
              <span className="inline-flex items-center gap-3">
                <Switch defaultChecked aria-label="Notifications on" />
                <span>On</span>
              </span>
              <span className="inline-flex items-center gap-3">
                <Switch disabled defaultChecked aria-label="Notifications locked" />
                <span>Disabled</span>
              </span>
            </div>
          </Specimen>

          <Specimen
            name="Progress"
            api="value · indicatorClassName"
            note="Use indicatorClassName only to recolor the filled bar; the track and geometry stay owned by Progress."
          >
            <div className="grid w-full max-w-md gap-2">
              <div className="flex items-center justify-between gap-4 body-xs text-slate-500">
                <span>Implementation readiness</span>
                <span>72%</span>
              </div>
              <Progress value={72} />
              <div className="flex items-center justify-between gap-4 pt-3 body-xs text-slate-500">
                <span>Evidence review</span>
                <span>44%</span>
              </div>
              <Progress value={44} indicatorClassName="bg-gold-600" />
            </div>
          </Specimen>
        </div>
      </DocSection>

      <DocSection
        id="components-labels"
        title="Badge"
        note="Badges label state or metadata; they are not CTA buttons. Use tone, variant, size, and optional icon props."
      >
        <div className="grid gap-10">
          <BadgePlayground />

          <Specimen name="StepBadge" api="variant · tone · size" note="Use for ordered flows. Rounded by default; square for denser tables or system diagrams. Default tone inherits the surrounding surface.">
            <StepBadge>01</StepBadge>
            <StepBadge tone="gold">02</StepBadge>
            <StepBadge tone="sage" variant="square">03</StepBadge>
            <StepBadge tone="sky" size="lg">04</StepBadge>
            <StepBadge tone="neutral" size="xl">05</StepBadge>
            <StepBadge tone="ghost">06</StepBadge>
            <StepBadge tone="ink">07</StepBadge>
          </Specimen>
        </div>
      </DocSection>

      <DocSection
        id="components-icons"
        title="Icons"
        note="One registry backed by Material Symbols Rounded. Add names in components/ui/icon.tsx before use."
      >
        <Specimen
          name="Icon"
          api="name · size · weight"
          note="The full named registry. The same names feed Icon, Button, Badge, and IconChip."
        >
          <div className="grid w-full grid-cols-3 gap-x-4 gap-y-5 text-blue-900 sm:grid-cols-4 md:grid-cols-6">
            {iconNames.map((name) => (
              <div key={name} className="grid justify-items-center gap-2 text-center">
                <Icon name={name} size="md" />
                <code className="body-xs break-all text-slate-500">{name}</code>
              </div>
            ))}
          </div>
        </Specimen>
      </DocSection>

      <DocSection
        id="components-iconchip"
        title="IconChip"
        note="Use for leading visual anchors. variant sets shape; tone sets color; size controls box and glyph weight."
      >
        <IconChipPlayground />
      </DocSection>

      <DocSection
        id="components-marks"
        title="Brand marks"
        note="Use sparingly for headlines or small rhythm breaks. These are punctuation, not section filler."
      >
        <div className="grid gap-10">
          <Specimen name="HeadlineDot · AccentUnderline">
            <div className="grid gap-3">
              <h3 className="h4">
                Open record
                <HeadlineDot />
              </h3>
              <AccentUnderline />
            </div>
          </Specimen>

          <Specimen name="AccentRule · DotMatrix">
            <div className="w-40">
              <AccentRule />
            </div>
            <DotMatrix rows={3} cols={5} className="w-20" />
          </Specimen>
        </div>
      </DocSection>

      <DocSection
        id="components-disclosure"
        title="Disclosure and feedback"
        note="Use these for progressive disclosure, status messages, and tabular data."
      >
        <div className="grid gap-10">
          <Specimen
            name="Dialog"
            api="DialogTrigger · DialogContent · DialogHeader · DialogTitle · DialogDescription"
            hint="Click to open"
          >
            <Dialog>
              <DialogTrigger asChild>
                <Button type="button">Open dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Record review</DialogTitle>
                  <DialogDescription>
                    Use Dialog when a focused decision or review needs to sit
                    above the page without becoming a new route.
                  </DialogDescription>
                </DialogHeader>
                <p className="body-sm text-slate-500">
                  Keep the trigger visible, title the dialog plainly, and put
                  supporting context in DialogDescription.
                </p>
              </DialogContent>
            </Dialog>
          </Specimen>

          <Specimen name="Expandable" api="ExpandableToggle · ExpandableBody" hint="Click to reveal" stage="frame">
            <ExpandableScope className="grid w-full min-w-0 gap-3 p-3 sm:p-6 lg:gap-4">
              <Expandable tone="cream" group="single" defaultOpen className="w-full min-w-0">
                <div className="grid gap-3 p-5 lg:p-6">
                  <div className="faq-card-head">
                    <div className="flex min-w-0 flex-1 flex-col items-start gap-3 sm:flex-row sm:items-center">
                      <IconChip name="admin" tone="gold" variant="tile" size="md" />
                      <h3 className="min-w-0 max-w-lg break-words h4">Who is Civic-Chain built for?</h3>
                    </div>
                    <ExpandableToggle className="faq-toggle" />
                  </div>
                  <ExpandableBody>
                    <p className="max-w-[72ch] body text-current/80">
                      Any entity that manages shared contractor spend. The same primitive handles the click, keyboard, ARIA, and reveal animation.
                    </p>
                  </ExpandableBody>
                </div>
              </Expandable>
              <Expandable tone="sky" group="single" className="w-full min-w-0">
                <div className="grid gap-3 p-5 lg:p-6">
                  <div className="faq-card-head">
                    <div className="flex min-w-0 flex-1 flex-col items-start gap-3 sm:flex-row sm:items-center">
                      <IconChip name="maine" tone="sky" variant="tile" size="md" />
                      <h3 className="min-w-0 max-w-lg break-words h4">Why start with smaller municipalities?</h3>
                    </div>
                    <ExpandableToggle className="faq-toggle" />
                  </div>
                  <ExpandableBody>
                    <p className="max-w-[72ch] body text-current/80">
                      Smaller towns carry visible contractor spend with lean teams, so the FAQ card needs room for a real answer, not a tiny technical note.
                    </p>
                  </ExpandableBody>
                </div>
              </Expandable>
              <Expandable tone="cream" group="single" className="w-full min-w-0">
                <div className="grid gap-3 p-5 lg:p-6">
                  <div className="faq-card-head">
                    <div className="flex min-w-0 flex-1 flex-col items-start gap-3 sm:flex-row sm:items-center">
                      <IconChip name="trust" tone="gold-soft" variant="tile" size="md" />
                      <h3 className="min-w-0 max-w-lg break-words h4">Is Civic-Chain primarily a blockchain company?</h3>
                    </div>
                    <ExpandableToggle className="faq-toggle" />
                  </div>
                  <ExpandableBody>
                    <p className="max-w-[72ch] body text-current/80">
                      No. This disclosure pattern supports calm answers first; implementation details stay secondary unless the user asks for them.
                    </p>
                  </ExpandableBody>
                </div>
              </Expandable>
            </ExpandableScope>
          </Specimen>

          <Specimen name="Alert" api="AlertTitle · AlertDescription">
            <div className="w-full max-w-lg">
              <Alert>
                <SystemIcon name="check-circle" />
                <AlertTitle>Claim-safe example</AlertTitle>
                <AlertDescription>
                  State the status and source before a claim or number is shown publicly.
                </AlertDescription>
              </Alert>
            </div>
          </Specimen>

          <Specimen name="Table" api="TableHeader · TableBody · TableRow · TableCell">
            <div className="w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <span className="sr-only">Selected</span>
                    </TableHead>
                    <TableHead>Primitive</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Use</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Checkbox aria-label="Select SurfaceCard" defaultChecked />
                    </TableCell>
                    <TableCell>SurfaceCard</TableCell>
                    <TableCell>UI</TableCell>
                    <TableCell>Tone and material surface</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Checkbox aria-label="Select Tabs" />
                    </TableCell>
                    <TableCell>Tabs</TableCell>
                    <TableCell>UI</TableCell>
                    <TableCell>Switch panels</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Specimen>
        </div>
      </DocSection>
    </main>
  );
}
