"use client";

interface WaitlistModalProps {
  open: boolean;
  onClose: () => void;
}

export default function WaitlistModal({ open, onClose }: WaitlistModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-[#010F31]">Join the Waitlist</h2>
        <p className="mt-1 text-sm text-[#5A6A8A]">
          Get notified when AiTrainingPlan launches.
        </p>
        <form
          className="mt-4 flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          <label className="text-sm font-medium text-[#010F31]">
            Email *
            <input
              type="email"
              required
              className="mt-1 w-full rounded border border-[#E2E8F0] px-3 py-2"
            />
          </label>
          <label className="text-sm font-medium text-[#010F31]">
            Role
            <select className="mt-1 w-full rounded border border-[#E2E8F0] px-3 py-2">
              <option>Select your role...</option>
              <option>Pro Athlete</option>
              <option>Fitness Influencer</option>
              <option>Coach</option>
              <option>Amateur Athlete</option>
            </select>
          </label>
          <p className="text-xs text-[#5A6A8A]">
            By joining, you agree to our Privacy Policy.
          </p>
          <button
            type="submit"
            className="rounded bg-[#FF6B35] px-4 py-2 font-semibold text-white"
          >
            Join Waitlist
          </button>
        </form>
      </div>
    </div>
  );
}
